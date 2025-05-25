// memory-read.js

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET allowed' });

  const supabaseUrl = 'https://tajcituowtduzqmhnhsr.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhamNpdHVvd3RkdXpxbWhuaHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxODg0OTMsImV4cCI6MjA2Mzc2NDQ5M30.8jFcF9MkhZs6iUmqKYKKljNx6SNiTofYeSyN_CyNqXM';

  const { actor, type, latest } = req.query;
  let query = `select=*`;

  if (actor) query += `&actor=eq.${actor}`;
  if (type) query += `&event_type=eq.${type}`;

  const result = await fetch(`${supabaseUrl}/rest/v1/logs?${query}`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  const data = await result.json();

  if (!result.ok) {
    return res.status(result.status).json({ error: 'Supabase fetch error', details: data });
  }

  if (latest === 'true' && data.length > 0) {
    return res.status(200).json({ entries: [data[data.length - 1]] });
  }

  res.status(200).json({ entries: data });
}
