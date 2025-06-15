// data/tickets.ts
// Mock de boletos vendidos

export interface Ticket {
  id: number
  eventId: number
  userId: string
  purchaseDate: string
  quantity: number
  totalPrice: number
  currency: string
  status: TicketStatus
  code: string
}

export type TicketStatus = 'active' | 'used' | 'cancelled' | 'expired'

export const mockTickets: Ticket[] = [
  {
    id: 1,
    eventId: 1,
    userId: '1',
    purchaseDate: '2024-10-05',
    quantity: 2,
    totalPrice: 91.98,
    currency: 'EUR',
    status: 'active',
    code: 'C0NC-R0CK-2024-001'
  },
  {
    id: 2,
    eventId: 3,
    userId: '1',
    purchaseDate: '2024-09-20',
    quantity: 1,
    totalPrice: 129.99,
    currency: 'EUR',
    status: 'active',
    code: 'TECH-CONF-2025-054'
  },
  {
    id: 3,
    eventId: 2,
    userId: '4',
    purchaseDate: '2024-10-01',
    quantity: 3,
    totalPrice: 226.5,
    currency: 'EUR',
    status: 'active',
    code: 'FUTB-COPA-2024-112'
  },
  {
    id: 4,
    eventId: 5,
    userId: '1',
    purchaseDate: '2024-08-15',
    quantity: 4,
    totalPrice: 100.0,
    currency: 'EUR',
    status: 'active',
    code: 'GAST-FEST-2025-076'
  }
]

export const getTicketsByUserId = (userId: string): Ticket[] => {
  return mockTickets.filter((ticket) => ticket.userId === userId)
}

export const getTicketsByEventId = (eventId: number): Ticket[] => {
  return mockTickets.filter((ticket) => ticket.eventId === eventId)
}

export const getTicketById = (id: number): Ticket | undefined => {
  return mockTickets.find((ticket) => ticket.id === id)
}
