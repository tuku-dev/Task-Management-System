const jwt = require('jsonwebtoken');
const config = require('../config/config')
const User = require('../models/User')

const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '30d'
  })
}

exports.register = async function (req, res) {
  const { username, email, password, role } = req.body

  try {
    const user = await User.create({
      username, email, password, role
    })
    const token = generateToken(user._id)

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}