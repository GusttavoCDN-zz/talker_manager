const express = require('express');
const { getSpeakers } = require('../utils');
const { addSpeaker } = require('../utils');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/validateSpeaker');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', async (req, res) => {
  const speakers = await getSpeakers();
  return res.status(200).json(speakers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const speakers = await getSpeakers();
  const speaker = speakers.find((s) => s.id === Number(id));
  if (!speaker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(speaker);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const speakers = await getSpeakers();
    const newSpeaker = {
      name,
      age,
      id: speakers.length + 1,
      talk,
    };
    await addSpeaker(newSpeaker);
    return res.status(201).json(newSpeaker);
  },
);

module.exports = router;
