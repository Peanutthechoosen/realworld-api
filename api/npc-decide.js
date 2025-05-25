export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { situation, npc } = req.body;
  if (!situation || !npc) return res.status(400).json({ error: 'Missing fields' });

  let decision = 'Neutral';
  if (situation.includes('Bedrohung')) {
    decision = `${npc} meidet die Konfrontation – defensives Verhalten.`;
  } else if (situation.includes('Chance')) {
    decision = `${npc} verfolgt eigenes Ziel, ignoriert Hauptfigur.`;
  } else {
    decision = `${npc} reagiert neutral, bleibt vorsichtig.`;
  }

  await fetch('https://realworld-api.vercel.app/api/memory-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'Entscheidung',
      description: decision,
      actor: npc
    })
  });

  res.status(200).json({ npc, situation, decision, rationale: 'Realistische Eigenreaktion' });
}