const fs = require('fs/promises');
const path = require('path');

async function getSpeakers() {
  const filePath = path.join(__dirname, '..', 'talker.json');
  const speakers = await fs.readFile(filePath, 'utf8');
  return JSON.parse(speakers);
}

getSpeakers();

module.exports = getSpeakers;