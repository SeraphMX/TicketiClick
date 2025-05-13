'use client'

import { useSelector } from '@/hooks/useReduxHooks'
import { RootState } from '@/store/store'
import { jsPDF } from 'jspdf'
import { Download, Mail, QrCode } from 'lucide-react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

interface TicketData {
  id: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  ticketHolder: string
  qrCode: string
}

export default function ConfirmationClient() {
  const router = useRouter()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!selectedEvent) {
      router.push('/events')
      return
    }

    const generateTickets = async () => {
      const ticketsData: TicketData[] = []

      // Generar un ticket por cada cantidad comprada
      for (let i = 0; i < (selectedEvent.quantity ?? 0); i++) {
        const ticketId = `${selectedEvent.id}-${Date.now()}-${i}`
        const ticketInfo = {
          eventId: selectedEvent.id,
          ticketId,
          eventName: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          ticketHolder: selectedEvent.ticketHolder || 'General Admission'
        }

        // Generar QR code
        const qrCode = await QRCode.toDataURL(JSON.stringify(ticketInfo))

        ticketsData.push({
          id: ticketId,
          eventName: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          eventLocation: selectedEvent.location,
          ticketHolder: selectedEvent.ticketHolder || 'General Admission',
          qrCode
        })
      }

      setTickets(ticketsData)
      setLoading(false)
    }

    generateTickets()
  }, [selectedEvent, router])

  const generatePDF = (ticket: TicketData) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [210, 99] // Tamaño de ticket estándar
    })

    // Añadir fondo
    doc.setFillColor(245, 245, 245)
    doc.rect(0, 0, 210, 99, 'F')

    // Añadir QR
    doc.addImage(ticket.qrCode, 'PNG', 150, 20, 50, 50)

    // Añadir información del evento
    doc.setFontSize(20)
    doc.text(ticket.eventName, 10, 20)

    doc.setFontSize(12)
    doc.text(`Fecha: ${ticket.eventDate}`, 10, 35)
    doc.text(`Hora: ${ticket.eventTime}`, 10, 45)
    doc.text(`Lugar: ${ticket.eventLocation}`, 10, 55)
    doc.text(`Titular: ${ticket.ticketHolder}`, 10, 65)
    doc.text(`ID: ${ticket.id}`, 10, 75)

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
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>¡Compra exitosa!</h1>
            <QrCode className='h-8 w-8 text-blue-600' />
          </div>
          <p className='text-gray-600 mb-4'>
            Tu compra se ha completado correctamente. A continuación, encontrarás tus boletos para descargar o enviar por correo
            electrónico.
          </p>
        </div>

        <div className='space-y-6'>
          {tickets.map((ticket) => (
            <div key={ticket.id} className='bg-white p-6 rounded-lg shadow-md'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <h2 className='text-xl font-semibold text-gray-900 mb-4'>{ticket.eventName}</h2>
                  <div className='space-y-2 text-gray-600'>
                    <p>Fecha: {ticket.eventDate}</p>
                    <p>Hora: {ticket.eventTime}</p>
                    <p>Lugar: {ticket.eventLocation}</p>
                    <p>Titular: {ticket.ticketHolder}</p>
                    <p className='font-mono text-sm'>ID: {ticket.id}</p>
                  </div>
                </div>
                <img src={ticket.qrCode} alt='QR Code' className='w-32 h-32' />
              </div>

              <div className='mt-6 flex gap-4'>
                <button
                  onClick={() => generatePDF(ticket)}
                  className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  <Download className='h-5 w-5 mr-2' />
                  Descargar PDF
                </button>
                <button
                  onClick={() => sendByEmail(ticket)}
                  className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
                >
                  <Mail className='h-5 w-5 mr-2' />
                  Enviar por email
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
