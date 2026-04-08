import { corsHeaders } from '@supabase/supabase-js/cors';

const ORS_BASE = 'https://api.openrouteservice.org/v2/directions/driving-car';

// CEP 83020-256 - São José dos Pinhais (origin)
const ORIGIN: [number, number] = [-49.2073, -25.5328]; // [lng, lat]

interface RouteRequest {
  destinations: Array<{
    id: string;
    lng: number;
    lat: number;
  }>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const ORS_API_KEY = Deno.env.get('ORS_API_KEY');
  if (!ORS_API_KEY) {
    return new Response(JSON.stringify({ error: 'ORS_API_KEY not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { destinations } = (await req.json()) as RouteRequest;

    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      return new Response(JSON.stringify({ error: 'destinations array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ORS free tier: use matrix API for multiple destinations
    const matrixUrl = 'https://api.openrouteservice.org/v2/matrix/driving-car';
    const locations = [ORIGIN, ...destinations.map(d => [d.lng, d.lat] as [number, number])];

    const matrixResponse = await fetch(matrixUrl, {
      method: 'POST',
      headers: {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locations,
        sources: [0], // origin only
        destinations: destinations.map((_, i) => i + 1),
        metrics: ['duration', 'distance'],
      }),
    });

    if (!matrixResponse.ok) {
      const errText = await matrixResponse.text();
      console.error(`ORS API error [${matrixResponse.status}]:`, errText);
      return new Response(JSON.stringify({ error: `ORS API error: ${matrixResponse.status}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const matrixData = await matrixResponse.json();
    const durations = matrixData.durations[0]; // seconds
    const distances = matrixData.distances[0]; // meters

    const results = destinations.map((dest, i) => ({
      id: dest.id,
      durationSeconds: Math.round(durations[i]),
      distanceKm: Math.round(distances[i] / 100) / 10, // 1 decimal
    }));

    return new Response(JSON.stringify({ results, timestamp: Date.now() }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ors-route:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
