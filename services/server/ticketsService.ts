import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const ticketService = {
  async getTicketbyCode(code: string) {
    const { data, error } = await supabaseAdmin.rpc('get_ticket_by_code', { p_code: code })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')

    return data
  }
}
