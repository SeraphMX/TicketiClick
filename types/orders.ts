export interface Order {
  email: string
  event_currency: string
  event_date: string
  event_description: string
  event_id: string
  event_price: number
  event_time: string
  event_title: string
  item_id: string
  order_created_at: string
  order_id: string
  quantity: number
  subtotal: number
  ticket_type: string
  total_amount: number
  unit_price: number
}

export interface Ticket {
  ticket_id: string
  issued_at: string
  used_at?: string
  order_id: string
  event_id: string
  event_title: string
  event_date: string
  ticket_type: string
  ticket_holder?: string
  code: string
  status: keyof typeof statusMap
}

export const statusMap = {
  valid: {
    color: 'text-green-500',
    label: 'Válido'
  },
  used: {
    color: 'text-blue-500',
    label: 'Ya utilizado'
  },
  cancelled: {
    color: 'text-red-500',
    label: 'Cancelado'
  }
}
