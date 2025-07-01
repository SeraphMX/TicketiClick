// hooks/useTickets.ts
import { useEffect } from 'react'

import { fetchOrdersByMail } from '@/store/slices/ticketsSlice'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

export const useTickets = (mail?: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const { orders, loading, error } = useSelector((state: RootState) => state.tickets)

  useEffect(() => {
    if (mail) {
      dispatch(fetchOrdersByMail(mail))
    }
  }, [mail, dispatch])

  return { orders, loading, error }
}
