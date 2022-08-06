const express = require('express');
const { getSpeakers, addSpeaker, getSpeaker, removeSpeaker } = require('../utils');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/validateSpeaker');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/search?', validateToken, async (req, res) => {
  const { q } = req.query;
  const speakers = await getSpeakers();

  if (!q || q.length === 0) return res.status(200).json(speakers);

  const filteredSpeakers = speakers.filter(({ name }) => name.includes(q));
  res.status(200).json(filteredSpeakers);
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

router.get('/', async (_req, res) => {
  const speakers = await getSpeakers();
  return res.status(200).json(speakers);
});

router.use(validateToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await removeSpeaker(id);
  return res.sendStatus(204);
});

router.use(validateName);
router.use(validateAge);
router.use(validateTalk);
router.use(validateWatchedAt);
router.use(validateRate);

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const oldSpeaker = await getSpeaker(id);
  if (!oldSpeaker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const newSpeaker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  await addSpeaker(newSpeaker);
  return res.status(200).json(newSpeaker);
});

module.exports = router;
