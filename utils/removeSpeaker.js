const { writeFile } = require('fs/promises');
const path = require('path');
const getSpeakers = require('./getSpeakers');

async function removeSpeaker(id) {
  const filePath = path.join(__dirname, '../', 'talker.json');
  const oldSpeakers = await getSpeakers();
  const newSpeakers = oldSpeakers.filter((s) => s.id !== Number(id));

  await writeFile(filePath, JSON.stringify(newSpeakers), 'utf8');
}

module.exports = removeSpeaker;
