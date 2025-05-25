export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { eventType, description, actor, timestamp } = req.body;

  if (!eventType || !description) {
    return res.status(400).json({ error: 'Missing eventType or description' });
  }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;


  const result = await fetch(`${supabaseUrl}/rest/v1/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({
      event_type: eventType,
      description,
      actor: actor || 'system',
      timestamp: timestamp || new Date().toISOString()
    })
  });

  const data = await result.json();

  if (!result.ok) {
    return res.status(result.status).json({ error: 'Supabase error', details: data });
  }

  res.status(200).json({ success: true, stored: data });
}
