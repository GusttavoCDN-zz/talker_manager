const getSpeakers = require('./getSpeakers');

async function getSpeaker(id) {
  const speakers = await getSpeakers();
  const speaker = speakers.find((s) => s.id === Number(id));
  return speaker;
}

module.exports = getSpeaker;
