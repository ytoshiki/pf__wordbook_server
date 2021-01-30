const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [
      {
        token: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  }
});

UserSchema.statics.compareHashedPassword = async function (reqPassword, userPassword) {
  isCorrect = await bcrypt.compare(reqPassword, userPassword);
  if (isCorrect) {
    return true;
  } else {
    return false;
  }
};

UserSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_KEY, { expiresIn: '7 days' });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

UserSchema.methods.breakToken = async function (token) {
  this.tokens = this.tokens.filter((ele) => ele.token !== token);
  await this.save();
};

module.exports = mongoose.model('User', UserSchema);
