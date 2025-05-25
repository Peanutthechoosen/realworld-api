export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { eventType, description, actor, timestamp } = req.body;

  if (!eventType || !description) {
    return res.status(400).json({ error: 'Missing fields: eventType, description' });
  }

  const entry = {
    eventType,
    description,
    actor: actor || 'system',
    timestamp: timestamp || new Date().toISOString()
  };

  // In einer echten API würdest du hier persistieren (z.B. DB oder JSON-Datei)
  console.log('Log-Eintrag:', entry);

  res.status(200).json({
    success: true,
    stored: entry
  });
}
