const User = require('../models/User');

exports.getUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}