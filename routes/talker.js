const express = require('express');
const { getSpeakers } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const speakers = await getSpeakers();
  return res.status(200).json(speakers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const speakers = await getSpeakers();
  const speaker = speakers.find((s) => s.id === Number(id));
  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(speaker);
});

module.exports = router;
