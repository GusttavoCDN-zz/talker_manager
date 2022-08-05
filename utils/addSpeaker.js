const fs = require('fs/promises');
const path = require('path');
const getSpeakers = require('./getSpeakers');

async function addSpeaker(speaker) {
  const speakersFile = path.join(__dirname, '..', 'talker.json');
  const oldSpeakers = await getSpeakers();
  const newSpeakers = [...oldSpeakers, speaker];

  await fs.writeFile(speakersFile, JSON.stringify(newSpeakers), 'utf8');
}

module.exports = addSpeaker;