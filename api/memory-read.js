// memory-read.js
import { readJson, pathExists } from 'fs-extra';
import { join } from 'path';

const LOG_PATH = './memory-log.json';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET allowed' });

  const { query } = req;
  const { actor, type, latest } = query;

  if (!(await pathExists(LOG_PATH))) {
    return res.status(200).json({ entries: [], message: 'Keine gespeicherten Logs vorhanden.' });
  }

  const data = await readJson(LOG_PATH);
  let results = data;

  if (actor) {
    results = results.filter(e => e.actor?.toLowerCase() === actor.toLowerCase());
  }

  if (type) {
    results = results.filter(e => e.eventType?.toLowerCase() === type.toLowerCase());
  }

  if (latest === 'true' && results.length > 0) {
    results = [results[results.length - 1]];
  }

  res.status(200).json({ entries: results });
}
