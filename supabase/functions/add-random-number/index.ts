import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Get the JWT token from the request
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error('No token provided')
    }

    // Verify the JWT token
    const { data: { user }, error } = await supabaseClient.auth.getUser(token)

    if (error || !user) {
      throw new Error('Invalid token')
    }

    // Parse the request body to get the random number
    const { randomNumber } = await req.json()

    if (typeof randomNumber !== 'number' || isNaN(randomNumber)) {
      throw new Error('Invalid random number provided')
    }

    // Insert the random number into the database
    const { data, error: insertError } = await supabaseClient
      .from('random_numbers')
      .insert({ number: randomNumber })
      .select()
      .single()

    if (insertError) throw insertError

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in add-random-number function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})