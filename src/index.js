require('dotenv').config();
const express = require('express');
const authRoutes = require('./presentation/controllers/AuthController');
const authMiddleware = require('./presentation/middlewares/auth');
const isAdmin = require('./presentation/middlewares/isAdmin');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/admin', authMiddleware, isAdmin, (req, res) => {
  res.send('Welcome Admin');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server on port ${PORT}`));
