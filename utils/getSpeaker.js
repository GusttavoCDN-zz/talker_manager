const getSpeakers = require('./getSpeakers');

async function getSpeaker(id) {
  const speakers = await getSpeakers();
  const speaker = speakers.find((s) => s.id === Number(id));
  return speaker;
}

getSpeaker(1);

module.exports = getSpeaker;
