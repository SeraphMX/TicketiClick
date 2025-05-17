import DownloadTickets from '@/components/tickets/DownloadTickets'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmación de Compra',
  description: 'Confirmación de compra de boletos para el evento'
}

export default function ConfirmationPage() {
  return <DownloadTickets />
}
