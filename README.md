# Realworld API

Eine Vercel-gehostete REST-API für GPT-basierte Rollenspiel-Engines, die auf realistischer Weltlogik basiert. Sie steuert NSC-Verhalten, Szenenlogik, Zeitfortschritt, Speicher-Logging und Regelverletzungsprüfungen – frei von Magie, Metakommentaren oder Pathos.

## Features

- 📜 **NSC-Entscheidungen** auf Basis realistischer Eigenlogik
- ⏳ **Szenenfortschrittsprüfung** abhängig von Zeit, Kontext und Weltzustand
- 🌍 **Weltstatus-Updates**: Fraktionen und Orte entwickeln sich unabhängig vom Spieler
- 🧠 **Memory-Logging** aller Ereignisse, Entscheidungen und Prüfungen
- 🧪 **Verstoß-Erkennung** gegen Erzählregeln wie Kitsch, Meta oder unlogische Eskalation

## Endpunkte

| Pfad                  | Beschreibung                                  |
|-----------------------|-----------------------------------------------|
| `/api/npc-decide`     | Reagiert realistisch auf eine Spielsituation |
| `/api/scene-continue` | Entscheidet, ob eine Szene weitergehen darf  |
| `/api/world-update`   | Verändert Weltstatus unabhängig vom Spieler  |
| `/api/memory-log`     | Speichert Ereignisse im Weltgedächtnis       |
| `/api/check-violation`| Prüft GPT-Antworten auf Regelverstöße        |

## OpenAPI-Schema

Die API ist vollständig per GPT-Aktion nutzbar:
```
https://raw.githubusercontent.com/Peanutthechoosen/realworld-api/main/openapi.yaml
```

## Deployment

- **Host**: [Vercel](https://vercel.com)
- **Format**: Serverless Functions (`.js` unter `/api`)
- **ESM-Unterstützung**: Native `fetch`, moderne Syntax via `"type": "module"`

## Lizenz

MIT – freie Nutzung, Weiterentwicklung ausdrücklich erwünscht.

---

*Realistisch. Reibungsvoll. Rollenspiel ohne Erfüllungslogik.*
