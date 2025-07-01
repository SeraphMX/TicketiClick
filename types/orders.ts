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
  id: number
  eventId: number
  userId: string
  purchaseDate: string
  quantity: number
  totalPrice: number
  currency: string
  status: 'active' | 'used'
  code: string
}
