'use client'
import { Input } from '@/components/ui/input'
import { ticketService } from '@/services/ticketService'
import { RootState } from '@/store/store'
import { formatDate } from '@/utils/date'
import { Button } from '@heroui/react'
import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { Calendar, QrCode, Search, Ticket, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export default function Page() {
  const [qrData, setQrData] = useState<string | null>(null)
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  interface TicketData {
    event_title: string
    event_date: string
    ticket_type: string
    ticket_holder?: string
    order_created_at: string
    code: string
    status: keyof typeof statusMap
  }

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'organizer') {
      router.push('/')
    }
  }, [isAuthenticated, user?.role, router])

  const handleScan = async (result: IDetectedBarcode[]) => {
    console.log(result)
    if (result && result.length > 0) {
      setQrData(result[0].rawValue)

      const ticket = await ticketService.getTicketbyCode(result[0].rawValue)

      if (ticket) {
        console.log('Ticket data:', ticket)
        setTicketData(ticket)
        // Aquí puedes manejar los datos del ticket escaneado, por ejemplo, mostrarlo en la UI
      } else {
        console.error('No se encontró el ticket con el código escaneado.')
      }
    }
  }

  const getTicket = async (code: string) => {
    try {
      const ticket = await ticketService.getTicketbyCode(code)
      if (ticket) {
        setTicketData(ticket)
        console.log('Ticket encontrado:', ticket)
      } else {
        console.error('No se encontró el ticket con el código proporcionado.')
      }
    } catch (error) {
      console.error('Error al buscar el ticket:', error)
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const handleSubmitCode = (data: { code: string }) => {
    getTicket(data.code)
  }

  const statusMap = {
    valid: {
      color: 'text-green-500',
      label: 'Válido'
    },
    used: {
      color: 'text-blue-500',
      label: 'used'
    },
    cancelled: {
      color: 'text-red-500',
      label: 'Cancelado'
    }
  }

  const handleCheckIn = async () => {
    if (!ticketData) return

    // Aquí puedes implementar la lógica para marcar el ticket como "checked in"
    // Por ejemplo, actualizar el estado del ticket en la base de datos
    console.log('Check-in realizado para el ticket:', ticketData.code)
    setTicketData(null) // Limpiar el ticket después del check-in
  }

  return (
    <section className='min-h-screen mt-20  flex flex-col items-center justify-center gap-4'>
      <BrowserView>
        <section>
          <form onSubmit={handleSubmit(handleSubmitCode)} className='flex items-center gap-2'>
            <Input {...register('code')} label='Código de ticket' isClearable />
            <Button type='submit' isIconOnly size='lg'>
              <Search size={24} />
            </Button>
          </form>
        </section>
      </BrowserView>
      <MobileView>
        <Scanner
          onScan={handleScan}
          sound={true}
          components={{
            torch: true,
            finder: true,
            tracker: outline
          }}
        />
      </MobileView>

      {qrData && (
        <div>
          <p>QR Code Data:</p>
          <pre>{qrData}</pre>
        </div>
      )}

      <section className='max-w-sm w-full p-4'>
        {ticketData ? (
          <div className='bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 '>
            <div className='border-b  border-gray-300 relative'>
              {/* Cabecera del boleto */}
              <div className='p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='font-bold text-lg'>{ticketData.event_title}</h3>
                    <p className='text-blue-100 text-sm'>{formatDate(ticketData.event_date, { style: 'short' })}</p>
                  </div>
                  {/* <div className={`${getStatusColor(order.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                      {translateStatus(order.status)}
                    </div> */}
                </div>
              </div>

              {/* Detalles del boleto */}
              <div className='p-6 relative'>
                <div className='flex flex-col space-y-3'>
                  <div className='flex items-center text-gray-700'>
                    <QrCode className='h-8 w-8 mr-2 text-blue-600' />
                    <div className='flex flex-col '>
                      <span className='capitalize font-mono '>{ticketData.code}</span>
                      <span className='text-sm text-gray-600 '>Código</span>
                    </div>
                  </div>
                  <div className='flex items-center text-gray-700'>
                    <Ticket className='h-8 w-8 mr-2 text-blue-600' />
                    <div className='flex flex-col '>
                      <span className='capitalize font-semibold'>{ticketData.ticket_type}</span>
                      <span className='text-sm text-gray-600'>Tipo de acceso</span>
                    </div>
                  </div>
                  {ticketData.ticket_holder && (
                    <div className='flex items-center text-gray-700'>
                      <User className='h-8 w-8 mr-2 text-blue-600' />
                      <div className='flex flex-col'>
                        <span className='font-semibold'>{ticketData.ticket_holder}</span>
                        <span className='text-sm text-gray-600'>Titular del boleto</span>
                      </div>
                    </div>
                  )}

                  <div className='flex items-center text-gray-700'>
                    <Calendar className='h-8 w-8 mr-2 text-blue-600' />
                    <div className='flex flex-col'>
                      {formatDate(ticketData.order_created_at)}
                      <span className='text-sm text-gray-600'>Fecha de compra</span>
                    </div>
                  </div>
                </div>
                {/* Círculos decorativos para el efecto de boleto recortable */}
                <div className='absolute -left-3 top-1/2 h-6 w-6 rounded-full bg-gray-100 border border-gray-200'></div>
                <div className='absolute -right-3 top-1/2 h-6 w-6 rounded-full bg-gray-100 border border-gray-200'></div>
              </div>
            </div>

            {/* Código y precio */}
            <footer className='p-4 flex justify-between items-center'>
              <div>
                <p className={`font-bold text-lg ${statusMap[ticketData.status]?.color}`}>{statusMap[ticketData.status].label}</p>
                <p className='text-xs text-gray-500'>Status</p>
              </div>
              <div className='text-right'>
                <Button color='primary' onPress={handleCheckIn}>
                  Check in
                </Button>
              </div>
            </footer>
          </div>
        ) : (
          <div className='flex items-center justify-center p-6 text-gray-600'>
            <QrCode className='h-5 w-5 mr-2 text-blue-600' />
            <p>Esperando ticket...</p>
          </div>
        )}
      </section>
    </section>
  )
}
