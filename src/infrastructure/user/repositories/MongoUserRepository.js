const UserModel = require('../models/UserModel');
const UserRepository = require('../../../domain/user/repositories/UserRepository');
const User = require('../../../domain/user/entities/User');

class MongoUserRepository extends UserRepository {
  async create(user) {
    const newUser = new UserModel(user);
    await newUser.save();
    return new User(newUser._id, newUser.email, newUser.password, newUser.role);
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return new User(user._id, user.email, user.password, user.role);
  }

  async findByResetToken(token) {
    const user = await UserModel.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
    return user;
  }

  async updatePassword(userId, newPassword) {
    await UserModel.findByIdAndUpdate(userId, { password: newPassword, resetToken: null, resetTokenExpire: null });
  }

  async saveResetToken(email, token, expires) {
    await UserModel.findOneAndUpdate({ email }, { resetToken: token, resetTokenExpire: expires });
  }
}

module.exports = MongoUserRepository;
