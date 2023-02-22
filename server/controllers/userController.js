const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

// Get all users
const getUsers = async (req, res) => {
  const users = await UserModel.find().sort({ createdAt: -1 }); //Sort by newest
  res.status(200).json(users);
};

// Get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signin(email, password);

    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create new user
const signUpUser = async (req, res) => {
  const { name, email, password, sex, age, height, weight, activityLevel } =
    req.body;

  try {
    const user = await UserModel.signup(
      name,
      email,
      password,
      sex,
      age,
      height,
      weight,
      activityLevel
    );

    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete user by id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = await UserModel.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

// Update user by id
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  signInUser,
  signUpUser,
  deleteUser,
  updateUser,
};
