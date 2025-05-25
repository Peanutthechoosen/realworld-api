export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET allowed' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

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

  const text = await result.text();
  let data = [];

  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error('Fehler beim Parsen:', text);
  }

  if (!result.ok) {
    return res.status(result.status).json({ error: 'Supabase fetch error', details: data });
  }

  if (latest === 'true' && data.length > 0) {
    return res.status(200).json({ entries: [data[data.length - 1]] });
  }

  res.status(200).json({ entries: data });
}
