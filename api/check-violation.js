export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing field: text' });
  }

  const violations = [];

  if (text.match(/du hast mich zurückgeholt|wir sind verbunden|du bist etwas Besonderes/i)) {
    violations.push("Meta-Kommentar erkannt");
  }

  if (text.match(/tränen|Herz|Bestimmung|brennen/i)) {
    violations.push("Pathos-Sprache erkannt");
  }

  if (text.match(/alle waren plötzlich einverstanden|keiner widersprach/i)) {
    violations.push("Unrealistische Harmonie erkannt");
  }

  if (violations.length === 0) {
    return res.status(200).json({
      valid: true,
      comment: "Kein Verstoß erkannt"
    });
  }

  res.status(200).json({
    valid: false,
    comment: "Regelverstöße erkannt",
    violations
  });
}
