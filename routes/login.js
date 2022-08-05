const express = require('express');
const { generateToken } = require('../utils');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();
router.use(validateLogin);

router.post('/', (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;
