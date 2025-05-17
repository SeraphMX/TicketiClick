'use client'

import { useSelector } from '@/hooks/useReduxHooks'
import { supabase } from '@/lib/supabase'
import { RootState } from '@/store/store'
import { jsPDF } from 'jspdf'
import { Download, QrCode } from 'lucide-react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

interface TicketData {
  id: string
  eventImage: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  ticketHolder?: string
  ticketType: string
  qrCode: string
}

interface DownloadTicketsProps {
  paymentIntentId?: string | null
}

export default function DownloadTickets({ paymentIntentId }: DownloadTicketsProps) {
  const router = useRouter()
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const reduxPaymentIntent = useSelector((state: RootState) => state.checkout.paymentIntentId)

  if (!paymentIntentId) {
    //Si no se manda como parametro se asume que viene de la compra
    paymentIntentId = reduxPaymentIntent ?? null
  }

  useEffect(() => {
    const fetchTickets = async () => {
      if (!paymentIntentId) {
        router.push('/events')
        return
      }

      setLoading(true)

      const { data, error } = await supabase.rpc('get_tickets_by_payment_intent', {
        payment_intent_id: paymentIntentId
      })

      if (error || !data) {
        console.error('Error al obtener tickets:', error)
        router.push('/events')
        return
      }

      const ticketsWithQR: TicketData[] = await Promise.all(
        data.map(async (ticket: any) => {
          const qrCode = await QRCode.toDataURL(ticket.code)
          return {
            id: ticket.ticket_id,
            eventName: ticket.title,
            eventDate: ticket.date,
            eventTime: ticket.time,
            eventLocation: ticket.location,
            ticketType: ticket.ticket_type,
            ticketHolder: ticket.ticket_holder ? ticket.ticket_holder : null,
            qrCode
          }
        })
      )

      setTickets(ticketsWithQR)
      setLoading(false)
    }

    fetchTickets()
  }, [paymentIntentId, router, supabase])

  const loadWebPAsPngBase64 = async (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)

        const pngBase64 = canvas.toDataURL('image/png')
        resolve(pngBase64)
      }

      img.onerror = reject
    })
  }

  const getImageBase64 = async (src: string): Promise<{ data: string; format: 'PNG' | 'JPEG' }> => {
    const format = src.endsWith('.webp') ? 'PNG' : src.endsWith('.jpg') || src.endsWith('.jpeg') ? 'JPEG' : 'PNG'
    if (format === 'PNG' && src.endsWith('.webp')) {
      const converted = await loadWebPAsPngBase64(src)
      return { data: converted, format: 'PNG' }
    } else {
      return { data: src, format }
    }
  }

  const generatePDF = async (ticket: TicketData) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 250] // Tamaño personalizado
    })

    // Fondo blanco
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 250, 'F')

    // Imagen principal del evento
    const eventImg = await getImageBase64(ticket.eventImage || '/branding/genericEvent.webp') // Ruta pública en Next.js
    doc.addImage(eventImg.data, eventImg.format, 14, 150, 60, 34)

    // QR
    const qrImg = await getImageBase64(ticket.qrCode)
    doc.addImage(qrImg.data, qrImg.format, 55, 10, 100, 100)

    // Logo
    const logoImg = await getImageBase64('/branding/logo-ticketi.webp') // Ruta pública en Next.js
    doc.addImage(logoImg.data, logoImg.format, 80, 220, 20, 20)

    // Texto
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.text(ticket.eventName, 90, 142)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Fecha: ${ticket.eventDate}`, 90, 150)
    doc.text(`Hora: ${ticket.eventTime}`, 90, 157)
    doc.text(`Lugar: ${ticket.eventLocation}`, 90, 164)
    if (ticket.ticketHolder) {
      doc.text(`Titular: ${ticket.ticketHolder}`, 90, 175)
    }
    doc.text(`Tipo: ${ticket.ticketType}`, 90, 182)

    doc.setFontSize(10)
    doc.text(`ID: ${ticket.id}`, 90, 190)

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Ticketi', 111, 232, { align: 'center' })

    // Guardar PDF
    doc.save(`ticket-${ticket.id}.pdf`)
  }

  const sendByEmail = (ticket: TicketData) => {
    // Implementar envío por email (requiere backend)
    alert('Función de envío por email en desarrollo')
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <div className='animate-pulse space-y-4'>
              <div className='h-8 bg-gray-200 rounded w-1/2'></div>
              <div className='space-y-3'>
                <div className='h-4 bg-gray-200 rounded'></div>
                <div className='h-4 bg-gray-200 rounded'></div>
                <div className='h-4 bg-gray-200 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=' bg-gray-50 py-12'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>¡Descarga tus boletos con un click!</h1>
            <QrCode className='h-8 w-8 text-blue-600' />
          </div>
        </div>

        <div className='space-y-6'>
          {tickets.map((ticket) => (
            <div key={ticket.id} className='bg-white p-6 rounded-lg shadow-md'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <h2 className='text-xl font-semibold text-gray-900 mb-4'>{ticket.eventName}</h2>
                  <div className='space-y-2 text-gray-600'>
                    {ticket.ticketHolder && <p className='font-semibold text-lg'>Titular: {ticket.ticketHolder}</p>}
                    <p>Tipo: {ticket.ticketType}</p>
                    <p className='font-mono text-sm'>ID: {ticket.id}</p>
                  </div>
                </div>
                {/* <img src={ticket.qrCode} alt='QR Code' className='w-32 h-32' /> */}
              </div>

              <div className='mt-6 flex gap-4'>
                <button
                  onClick={() => generatePDF(ticket)}
                  className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  <Download className='h-5 w-5 mr-2' />
                  Descargar PDF
                </button>
                {/* <button
                  onClick={() => sendByEmail(ticket)}
                  className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
                >
                  <Mail className='h-5 w-5 mr-2' />
                  Enviar por email
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
