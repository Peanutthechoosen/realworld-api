// Datei: api/npc-profile.js

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (req.method === 'POST') {
    const profile = req.body;

    if (!profile.name) {
      return res.status(400).json({ error: 'Missing NPC name' });
    }

    const result = await fetch(`${supabaseUrl}/rest/v1/npc_profiles?name=eq.${profile.name}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const existing = await result.json();
    const method = existing.length ? 'PATCH' : 'POST';
    const url = existing.length
      ? `${supabaseUrl}/rest/v1/npc_profiles?name=eq.${profile.name}`
      : `${supabaseUrl}/rest/v1/npc_profiles`;

    const save = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(profile)
    });

    const data = await save.json();
    return res.status(save.status).json(data);
  }

  if (req.method === 'GET') {
    const name = req.query.name;
    const activeOnly = req.query.activeOnly === 'true';

    let query = 'select=*';
    if (name) query += `&name=eq.${name}`;
    if (activeOnly) query += '&status=eq.aktiv';

    const result = await fetch(`${supabaseUrl}/rest/v1/npc_profiles?${query}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const data = await result.json();
    return res.status(200).json({ profiles: data });
  }

  return res.status(405).json({ error: 'Only GET and POST allowed' });
}
