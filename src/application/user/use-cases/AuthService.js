const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../../../utils/mailer');
const User = require('../../../domain/user/entities/User');
class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(name, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(null, name, email, hashedPassword, role);
    return await this.userRepo.create(user);
  }
  
  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Identifiants invalides');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Mot de passe envoyé:', password);
    console.log('Mot de passe dans la base de données:', user.password);
    console.log('Mot de passe correct:', isMatch);
  
    if (!isMatch) {
      throw new Error('Mot de passe incorrect');
    }
  
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

