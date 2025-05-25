export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { situation, npc } = req.body;

  if (!situation || !npc) {
    return res.status(400).json({ error: 'Missing required fields: situation, npc' });
  }

  // Simulierte realistische Entscheidung
  let decision;
  if (situation.includes('Bedrohung')) {
    decision = `${npc} meidet die Konfrontation – defensives Verhalten.`;
  } else if (situation.includes('Chance')) {
    decision = `${npc} verfolgt eigenes Ziel, ignoriert Hauptfigur.`;
  } else {
    decision = `${npc} reagiert neutral, bleibt vorsichtig.`;
  }

  res.status(200).json({
    npc,
    situation,
    decision,
    rationale: 'Basierend auf Eigeninteresse und Weltlogik, nicht Spielerorientierung.'
  });
}
