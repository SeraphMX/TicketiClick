'use client'
import { Input } from '@/components/ui/input'
import { ticketService } from '@/services/ticketService'
import { RootState } from '@/store/store'
import { statusMap, Ticket } from '@/types/orders'
import { formatDate } from '@/utils/date'
import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { Calendar, CalendarCheck2, QrCode, Search, Ticket as TicketIcon, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
export default function Page() {
  const [ticketData, setTicketData] = useState<Ticket | null>(null)
  const [ticketError, setTicketError] = useState<string | null>(null)
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated && user?.role !== 'organizer') {
  //     router.push('/')
  //   }
  // }, [isAuthenticated, user, router])

  const handleScan = async (result: IDetectedBarcode[]) => {
    if (result && result.length > 0) {
      getTicket(result[0].rawValue)
    }
  }

  const getTicket = async (code: string) => {
    try {
      const ticket = await ticketService.getTicketbyCode(code)
      if (ticket) {
        setTicketError(null)
        setTicketData(ticket)
        console.log('Ticket encontrado:', ticket)
        onOpen() // Abrir el modal al encontrar el ticket
      } else {
        console.error('No se encontró el ticket con el código proporcionado.')
        setTicketError('Código invalido')
      }
    } catch (error) {
      console.error('Error al buscar el ticket:', error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const handleSubmitCode = (data: { code: string }) => {
    getTicket(data.code)
  }

  const handleCheckIn = async () => {
    if (!ticketData) return
    ticketService.ticketCheckIn(ticketData.ticket_id)
    console.log('Check-in realizado para el ticket:', ticketData.code)
    setTicketData(null) // Limpiar el ticket después del check-in
    onOpenChange() // Cerrar el modal
  }

  return (
    <section className='min-h-screen mt-14  flex flex-col items-center justify-start gap-4'>
      <BrowserView className='mt-8'>
        <section>
          <form onSubmit={handleSubmit(handleSubmitCode)} className='flex items-center gap-2'>
            <Input {...register('code', { required: 'Requerido' })} isInvalid={!!errors.code} label='Código de ticket' isClearable />
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

      {!ticketData && !ticketError && (
        <div className='flex items-center justify-center p-6 text-gray-600'>
          <QrCode className='h-5 w-5 mr-2 text-blue-600' />
          <p>Esperando ticket...</p>
        </div>
      )}

      {ticketError && (
        <div className='flex items-center justify-center p-6 text-red-600'>
          <QrCode className='h-5 w-5 mr-2 ' />
          <p>{ticketError}</p>
        </div>
      )}

      <section className='max-w-sm   gap-4 w-full p-4'>
        <Card className='flex flex-col items-center justify-center h-24'>
          <p className='text-3xl'>16/150</p>
          <p className='text-xs'>Escaneados</p>
        </Card>
      </section>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setTicketData(null)
        }}
        isDismissable={false}
        classNames={{ closeButton: 'text-white hover:text-black' }}
      >
        {ticketData && (
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className='p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='font-bold text-lg'>{ticketData.event_title}</h3>
                      <p className='text-blue-100 text-sm'>{formatDate(ticketData.event_date, { style: 'short' })}</p>
                    </div>
                    {/* <div className={`${getStatusColor(order.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                        {translateStatus(order.status)}
                      </div> */}
                  </div>
                </ModalHeader>
                <ModalBody>
                  <section className='max-w-sm w-full py-4'>
                    <div className='flex flex-col space-y-3'>
                      <div className='flex items-center text-gray-700'>
                        <QrCode className='h-8 w-8 mr-2 text-blue-600' />
                        <div className='flex flex-col '>
                          <span className='capitalize font-mono '>{ticketData.code}</span>
                          <span className='text-sm text-gray-600 '>Código</span>
                        </div>
                      </div>
                      <div className='flex items-center text-gray-700'>
                        <TicketIcon className='h-8 w-8 mr-2 text-blue-600' />
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
                          {formatDate(ticketData.issued_at)}
                          <span className='text-sm text-gray-600'>Fecha de compra</span>
                        </div>
                      </div>
                      {ticketData.used_at && (
                        <div className='flex items-center text-gray-700'>
                          <CalendarCheck2 className='h-8 w-8 mr-2 text-blue-600' />
                          <div className='flex flex-col'>
                            {formatDate(ticketData.used_at)}
                            <span className='text-sm text-gray-600'>Fecha de uso</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </ModalBody>
                <ModalFooter className='p-4 flex justify-between items-center'>
                  <div>
                    <p className={`font-bold text-lg ${statusMap[ticketData.status]?.color}`}>{statusMap[ticketData.status].label}</p>
                    <p className='text-xs text-gray-500'>Status</p>
                  </div>
                  <div className='text-right'>
                    {ticketData.status === 'valid' && (
                      <Button color='primary' onPress={handleCheckIn}>
                        Check in
                      </Button>
                    )}
                  </div>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        )}
      </Modal>
    </section>
  )
}
