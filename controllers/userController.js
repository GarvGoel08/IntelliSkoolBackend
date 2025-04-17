const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      type
    });
    
    const savedUser = await user.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userDetails = savedUser.toObject();
    delete userDetails._id;
    delete userDetails.password;

    res.status(201).json({ user: userDetails, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });

    const userDetails = user.toObject();
    delete userDetails._id;
    delete userDetails.password;

    res.json({ user: userDetails, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDetails = user.toObject();
    delete userDetails._id;
    delete userDetails.password;

    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  getUserDetail
};
