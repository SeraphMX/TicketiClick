// store/ticketsSlice.ts
import { userService } from '@/services/userService'
import { Order } from '@/types/orders'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface TicketsState {
  orders: Order[]
  loading: boolean
  error: string | null
  lastFetchedMail: string | null
}

const initialState: TicketsState = {
  orders: [],
  loading: false,
  error: null,
  lastFetchedMail: null
}

export const fetchOrdersByMail = createAsyncThunk('tickets/fetchByMail', async (mail: string) => {
  return await userService.getOrdersByMail(mail)
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByMail.pending, (state, action) => {
        if (state.lastFetchedMail !== action.meta.arg) {
          state.loading = true
        }
      })
      .addCase(fetchOrdersByMail.fulfilled, (state, action) => {
        state.orders = action.payload
        state.lastFetchedMail = action.meta.arg
        state.loading = false
      })
      .addCase(fetchOrdersByMail.rejected, (state, action) => {
        state.error = action.error.message || 'Error al cargar boletos'
        state.loading = false
      })
  }
})

export default ticketsSlice.reducer
