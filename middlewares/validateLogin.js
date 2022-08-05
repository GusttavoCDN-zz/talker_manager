function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  next();
}

module.exports = validateLogin;
