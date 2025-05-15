const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'En ny användare har lagts till!' });
  } catch (error) {
    res.status(500).json({ error: 'Registreringen blev fel!' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Det gick inte att logga in med din användare!' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Ditt lösenord är inte korrekt!' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({
      token,
      message: 'Du är inloggad!',
      username,
    });
  } catch (error) {
    res.status(500).json({ error: 'Inloggningen gick fel!' });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const deletedUser = await UserModel.deleteOne({ username: email });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
