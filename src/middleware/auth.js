const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const auth = async (req, res, next) => {
  const token = req.header('AUTHORIZATION').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const user_id = decoded._id;

  try {
    const user = await UserModel.findOne({
      _id: user_id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error('User Not Found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
