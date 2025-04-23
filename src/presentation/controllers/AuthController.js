const express = require('express');
const MongoUserRepository = require('../../infrastructure/user/repositories/MongoUserRepository');
const AuthService = require('../../application/user/use-cases/AuthService');
const router = express.Router();

const repo = new MongoUserRepository();
const authService = new AuthService(repo);

router.post('/register', async (req, res) => {
  try {
    const user = await authService.register(req.body.email, req.body.password, req.body.role);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({ message: 'Email envoyé' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);
    res.json({ message: 'Mot de passe mis à jour' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;