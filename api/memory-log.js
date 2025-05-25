export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { eventType, description, actor, timestamp } = req.body;
  if (!eventType || !description) return res.status(400).json({ error: 'Missing eventType or description' });

  const entry = {
    eventType,
    description,
    actor: actor || 'system',
    timestamp: timestamp || new Date().toISOString()
  };

  console.log('Log:', entry);
  res.status(200).json({ success: true, stored: entry });
}