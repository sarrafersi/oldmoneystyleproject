const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../../../utils/mailer');

class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(email, password, role = 'client') {
    const hashed = await bcrypt.hash(password, 10);
    return await this.userRepo.create({ email, password: hashed, role });
  }

  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Identifiants invalides');
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  async forgotPassword(email) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000);
    await this.userRepo.saveResetToken(email, token, expires);
    await sendResetEmail(email, token);
  }

  async resetPassword(token, newPassword) {
    const user = await this.userRepo.findByResetToken(token);
    if (!user) throw new Error('Token invalide ou expiré');
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepo.updatePassword(user._id, hashed);
  }
}

module.exports = AuthService;

