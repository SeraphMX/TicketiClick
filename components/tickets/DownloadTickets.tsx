'use client'

import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { Spinner } from '@heroui/react'
import { Document, Page, PDFDownloadLink, Image as RenderImage, StyleSheet, Text, View } from '@react-pdf/renderer'

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
  paymentIntentId?: string
}

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Helvetica' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  // Contenedor del QR y texto
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5, // opcional, si tu versión lo soporta
    marginBottom: 20
  },

  // Contenedor del texto
  infoBox: {
    padding: 10,
    width: 300, // asegúrate de no hacerlo más ancho que el A4 menos el QR
    marginLeft: -30
  },

  text: {
    marginBottom: 4,
    fontSize: 16,
    color: '#111'
  },

  qrImage: { width: 250 },
  eventImage: { width: '100%', height: 'auto', marginBottom: 10 },
  logoImage: { width: 100 },

  footer: {
    textAlign: 'center',
    backgroundColor: '#1e3a8b',
    padding: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    fontSize: 14,
    marginTop: 20
  }
})

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

function TicketPDF({ ticket }: { ticket: TicketData }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <RenderImage src={ticket.eventImage} style={styles.eventImage} />

        <View style={styles.section}>
          <RenderImage src={ticket.qrCode} style={styles.qrImage} />

          <View style={styles.infoBox}>
            <Text style={styles.title}>{ticket.eventName}</Text>
            <Text style={styles.text}>
              Fecha: {formatDate(ticket.eventDate)} {ticket.eventTime}
            </Text>
            <Text style={styles.text}>{ticket.eventLocation}</Text>
            {ticket.ticketHolder && <Text style={styles.text}>Titular: {ticket.ticketHolder}</Text>}
            <Text style={styles.text}>Tipo: {ticket.ticketType}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RenderImage src='/branding/logo-ticketi-full.png' style={styles.logoImage} />
          <Text>ID: {ticket.id}</Text>
        </View>
      </Page>
    </Document>
  )
}

function TicketsPDFDocument({ tickets }: { tickets: TicketData[] }) {
  return (
    <Document>
      {tickets.map((ticket) => (
        <Page size={[300, 600]} style={styles.page} key={ticket.id}>
          <RenderImage src={ticket.eventImage} style={styles.eventImage} />

          <View style={styles.section}>
            <RenderImage src={ticket.qrCode} style={styles.qrImage} />

            <View style={styles.infoBox}>
              <Text style={styles.title}>{ticket.eventName}</Text>
              <Text style={styles.text}>
                Fecha: {formatDate(ticket.eventDate)} {ticket.eventTime}
              </Text>
              <Text style={styles.text}>{ticket.eventLocation}</Text>
              {ticket.ticketHolder && <Text style={styles.text}>Titular: {ticket.ticketHolder}</Text>}
              <Text style={styles.text}>Tipo: {ticket.ticketType}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <RenderImage src='/branding/logo-ticketi-full.png' style={styles.logoImage} />
            <Text>ID: {ticket.id}</Text>
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default function DownloadTickets({ paymentIntentId }: DownloadTicketsProps) {
  const router = useRouter()
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      if (!paymentIntentId) {
        router.push('/eventos')
        return
      }

      setLoading(true)

      const { data, error } = await supabase.rpc('get_tickets_by_payment_intent', {
        payment_intent_id: paymentIntentId
      })

      if (error || !data) {
        console.error('Error al obtener tickets:', error)
        router.push('/eventos')
        return
      }

      const ticketsWithQR = await Promise.all(
        data.map(async (ticket: any) => {
          const qrCode = await QRCode.toDataURL(ticket.code) // base64 PNG, ok para ReactPDF

          // Convertir eventImage a base64 PNG si es WebP o URL remota
          let eventImageBase64 = ticket.image
          if (ticket.image.endsWith('.webp')) {
            eventImageBase64 = await loadWebPAsPngBase64(ticket.image)
          }
          // Si ya es base64 o JPEG, puedes dejarlo

          return {
            id: ticket.ticket_id,
            eventName: ticket.title,
            eventDate: ticket.date,
            eventTime: ticket.time,
            eventLocation: ticket.location,
            eventImage: eventImageBase64,
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
  }, [paymentIntentId, router])

  if (loading) {
    return <Spinner label='Cargando tickets...' />
  }

  return (
    <div className='py-12 max-w-3xl mx-auto px-4 space-y-6'>
      {tickets.length > 1 ? (
        <>
          <h1 className='text-2xl font-bold '>¡Descarga tus boletos!</h1>
          <p>Puedes descargar todos los boletos juntos o también por separado si necesitas enviarlos a alguien más.</p>
          <PDFDownloadLink
            document={<TicketsPDFDocument tickets={tickets} />}
            fileName={`boletos-${paymentIntentId}.pdf`}
            className='inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar todos los boletos')}
          </PDFDownloadLink>
        </>
      ) : (
        <>
          <h1 className='text-2xl font-bold '>¡Descarga tu boleto!</h1>
          <p>Descarga en un click tu acceso al evento.</p>
        </>
      )}

      <div className='flex flex-col  gap-6'>
        {tickets.map((ticket) => (
          <div key={ticket.id} className='bg-white p-4 rounded-lg shadow-md sm:flex items-center gap-4'>
            <img src={ticket.eventImage} alt={ticket.eventName} className='sm:w-1/3' />
            <section>
              <h2 className='text-xl font-semibold mb-2'>{ticket.eventName}</h2>
              <p className='mb-2'>Tipo: {ticket.ticketType}</p>
              {ticket.ticketHolder && <p className='mb-2'>Titular: {ticket.ticketHolder}</p>}
              {/* Botón para descargar PDF generado con ReactPDF */}
              <PDFDownloadLink
                document={<TicketPDF ticket={ticket} />}
                fileName={`ticket-${ticket.id}.pdf`}
                className='inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              >
                {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar Boleto')}
              </PDFDownloadLink>
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}
