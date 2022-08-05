const express = require('express');
const { getSpeakers } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const speakers = await getSpeakers();
  res.status(200).json(speakers);
});

module.exports = router;
