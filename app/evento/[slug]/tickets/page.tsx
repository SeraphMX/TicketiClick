'use client'
import DownloadTickets from '@/components/tickets/DownloadTickets'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export default function ConfirmationPage() {
  const reduxPaymentIntent = useSelector((state: RootState) => state.checkout.paymentIntentId)
  return (
    <section className='min-h-screen flex flex-col items-center justify-center p-4 space-y-8'>
      <DownloadTickets paymentIntentId={reduxPaymentIntent} />
    </section>
  )
}
