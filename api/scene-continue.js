export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { scene, timePassed, npcsInvolved } = req.body;
  if (!scene || typeof timePassed !== 'number' || !Array.isArray(npcsInvolved))
    return res.status(400).json({ error: 'Missing or invalid fields' });

  let allowed = true;
  let reason = 'Szene kann logisch fortgesetzt werden.';

  if (timePassed < 5) {
    allowed = false;
    reason = 'Zu wenig Zeit vergangen – keine Entwicklung plausibel.';
  }

  if (npcsInvolved.length === 0) {
    allowed = false;
    reason = 'Keine relevanten Figuren verfügbar.';
  }

  await fetch('https://realworld-api.vercel.app/api/memory-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'Szenenprüfung',
      description: reason,
      actor: 'system'
    })
  });

  res.status(200).json({ continueAllowed: allowed, scene, timePassed, npcsInvolved, reason });
}