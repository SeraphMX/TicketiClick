import { Event, mockEvents } from '@/data/events'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EventsState {
  items: Event[]
  loading: boolean
  error: string | null
  selectedEvent: Event | null
}

const initialState: EventsState = {
  items: mockEvents,
  loading: false,
  error: null,
  selectedEvent: null
}

// Thunk para cargar eventos (preparado para futura integración con Supabase)
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  // Simular llamada a API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockEvents
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload
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

export const { setSelectedEvent } = eventsSlice.actions
export default eventsSlice.reducer
