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

    const lookupResult = await client.lookups.v2.phoneNumbers(formattedPhone).fetch({ fields: ['line_type_intelligence'] })

    return new Response(
      JSON.stringify({
        isValid: lookupResult.valid,
        isMobile: lookupResult.lineTypeIntelligence?.type === 'mobile',
        carrier: lookupResult.carrier?.name,
        countryCode: lookupResult.countryCode
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
