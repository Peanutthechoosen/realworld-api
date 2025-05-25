export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests allowed' });
    }
  
    const { lastKnownState, hoursPassed } = req.body;
  
    if (!lastKnownState || typeof hoursPassed !== 'number') {
      return res.status(400).json({ error: 'Missing fields: lastKnownState (string), hoursPassed (number)' });
    }
  
    let outcome = 'Keine signifikante Veränderung.';
    let events = [];
  
    if (hoursPassed > 12) {
      outcome = 'Fraktionen haben unabhängig agiert. Gebietskontrolle verändert sich.';
      events.push('Ein neuer Akteur übernimmt das Lagerhaus');
      events.push('Informationen über Peanut verbreiten sich im Untergrund');
    }
  
    res.status(200).json({
      updated: true,
      worldEvents: events,
      summary: outcome
    });
  }
  