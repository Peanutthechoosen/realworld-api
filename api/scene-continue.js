export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { scene, timePassed, npcsInvolved } = req.body;

  if (!scene || !timePassed || !Array.isArray(npcsInvolved)) {
    return res.status(400).json({ error: 'Missing fields: scene, timePassed, npcsInvolved (as array)' });
  }

  let allowed = true;
  let reason = 'Szene kann logisch fortgesetzt werden.';

  if (parseInt(timePassed) < 5) {
    allowed = false;
    reason = 'Zu wenig Zeit vergangen – keine Entwicklung plausibel.';
  }

  if (npcsInvolved.length === 0) {
    allowed = false;
    reason = 'Keine relevanten Figuren verfügbar.';
  }

  res.status(200).json({
    continueAllowed: allowed,
    scene,
    timePassed,
    npcsInvolved,
    reason
  });
}
