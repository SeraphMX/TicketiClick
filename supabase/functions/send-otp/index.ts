import { serve } from 'https://deno.land/std@0.210.0/http/server.ts'
import twilio from 'npm:twilio'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone } = await req.json()

    if (!phone) {
      return new Response(JSON.stringify({ error: 'Phone number is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const client = twilio(Deno.env.get('TWILIO_ACCOUNT_SID'), Deno.env.get('TWILIO_AUTH_TOKEN'))

    const formattedPhone = phone.startsWith('+52') ? phone : `+52${phone}`

    // Usar Verify en lugar de SMS directo
    const verification = await client.verify.v2.services(Deno.env.get('TWILIO_VERIFY_SERVICE_SID')).verifications.create({
      to: formattedPhone,
      channel: 'sms'
    })

    return new Response(
      JSON.stringify({
        success: true,
        status: verification.status
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
