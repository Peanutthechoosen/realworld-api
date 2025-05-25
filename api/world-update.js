export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { lastKnownState, hoursPassed } = req.body;
  if (!lastKnownState || typeof hoursPassed !== 'number')
    return res.status(400).json({ error: 'Missing fields' });

  let outcome = 'Keine signifikante Veränderung.';
  let events = [];

  if (hoursPassed > 12) {
    outcome = 'Fraktionen haben unabhängig agiert. Gebietskontrolle verändert sich.';
    events.push('Ein neuer Akteur übernimmt das Lagerhaus');
    events.push('Informationen über Peanut verbreiten sich im Untergrund');
  }

  await fetch('https://realworld-api.vercel.app/api/memory-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'Weltveränderung',
      description: outcome,
      actor: 'system'
    })
  });

  res.status(200).json({ updated: true, summary: outcome, worldEvents: events });
}
