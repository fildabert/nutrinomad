const UserModel = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userValidator = require('../validators/user.validator');

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: '1d' });
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

// Sign in user
const signInUser = async (req, res) => {
  const { error, value } = userValidator.signInValidator.validate(req.body);

  if (error) {
    // Return a 400 Bad Request response if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = value;

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
  const { error, value } = userValidator.createUserValidator.validate(req.body);
  if (error) {
    // Return a 400 Bad Request response if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    name,
    email,
    password,
    sex,
    age,
    height,
    weight,
    goal,
    activityLevel,
  } = value;

  try {
    const user = await UserModel.signup(
      name,
      email,
      password,
      sex,
      age,
      height,
      weight,
      goal,
      activityLevel
    );

    await user.calculateBmr();

    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get user bmr
const getUserBmr = async (req, res) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user.bmr);
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
  getUserBmr,
  deleteUser,
  updateUser,
};
