import { Event } from '@/lib/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabase'

interface EventsState {
  items: Event[]
  loading: boolean
  error: string | null
  selectedEvent: Event & { quantity?: number; ticketHolder?: string } | null
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
  selectedEvent: null
}

// Thunk para cargar eventos desde Supabase
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const { data, error } = await supabase.from('event_details_view').select('*')
  if (error) throw error
  return data
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload
    },
    updateSelectedEventDetails: (state, action: PayloadAction<{ quantity: number; ticketHolder?: string }>) => {
      if (state.selectedEvent) {
        state.selectedEvent = {
          ...state.selectedEvent,
          ...action.payload
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar eventos'
      })
  }
})

export const { setSelectedEvent, updateSelectedEventDetails } = eventsSlice.actions
export default eventsSlice.reducer