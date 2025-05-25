export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  const violations = [];
  if (/du hast mich zurückgeholt|wir sind verbunden|du bist etwas Besonderes/i.test(text))
    violations.push('Meta-Kommentar erkannt');
  if (/tränen|Herz|Bestimmung|brennen/i.test(text))
    violations.push('Pathos-Sprache erkannt');
  if (/alle waren plötzlich einverstanden|keiner widersprach/i.test(text))
    violations.push('Unrealistische Harmonie erkannt');

  await fetch('https://realworld-api.vercel.app/api/memory-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'Verstoßprüfung',
      description: violations.join(', ') || 'Keine Verstöße erkannt',
      actor: 'system'
    })
  });

  if (violations.length === 0) {
    res.status(200).json({ valid: true, comment: 'Kein Verstoß erkannt' });
  } else {
    res.status(200).json({ valid: false, comment: 'Regelverstöße erkannt', violations });
  }
}
