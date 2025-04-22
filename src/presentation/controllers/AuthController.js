const express = require('express');
const RegisterUser = require('../../application/user/use-cases/RegisterUser');
const LoginUser = require('../../application/user/use-cases/LoginUser');
const InMemoryUserRepository = require('../../infrastructure/user/repositories/InMemoryUserRepository');

const router = express.Router();
const userRepo = new InMemoryUserRepository();
const registerUser = new RegisterUser(userRepo);
const loginUser = new LoginUser(userRepo);

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser.execute(name, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser.execute(email, password);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
