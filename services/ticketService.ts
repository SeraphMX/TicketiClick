import { supabase } from '@/lib/supabase'

export const ticketService = {
  async getTicketbyCode(code: string) {
    const { data, error } = await supabase.rpc('get_ticket_by_code', { p_code: code })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')

    return data
  }
}
