const router = require('express').Router();
const UserSchema = require('../models/UserModel');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  res.send({
    user: req.user,
    token: req.token
  });
});

// Signup
router.post('/signup', async (req, res) => {
  const reqUser = new UserSchema(req.body);
  try {
    const user = await reqUser.save();
    const token = await user.generateToken();

    res.status(201).json({
      success: true,
      data: user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: []
    });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Either email and password is missing'
    });
  }

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw new Error('User Not Found');
    }

    const passwordMatch = await UserSchema.compareHashedPassword(password, user.password);

    if (!passwordMatch) {
      throw new Error('User Not Found');
    }

    const token = await user.generateToken();

    res.send({
      success: true,
      data: user,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User Not Found'
    });
  }
});

router.post('/logout', auth, async (req, res) => {
  await req.user.breakToken(req.token);
  res.send({
    success: true,
    message: 'Logged Out Successfully'
  });
});

module.exports = router;