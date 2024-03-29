const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

// Get all users
const getUsers = async (req, res) => {
  const users = await userService.getAllUsers(); //Sort by newest
  res.status(200).json(users);
};

// Get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

// Sign in user
const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.signIn(email, password);
    const name = user.name;

    const token = createToken(user._id);

    return res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create new user
const signUpUser = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    await user.calculateBmrAndMacroIntake();
    await user.calculateMinMicroIntake();
    const token = createToken(user._id);

    return res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get user bmr
const getUserBmrAndMacroByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json({
    bmr: user.bmr,
    proteinIntake: user.proteinIntake,
    fatIntake: user.fatIntake,
    carbsIntake: user.carbsIntake,
    minMicronutrientIntake: user.minMicronutrientIntake,
  });
};

// Delete user by id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUserById(id);
  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res
    .status(200)
    .json({ success: `User ${deletedUser.name} successfully deleted` });
};

// Update user by id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUserById(id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  const user = await userService.updateUserPasswordById(
    id,
    currentPassword,
    newPassword
  );
  if (user.error) {
    return res.status(400).json({ error: user.error });
  }
  res.status(200).json(user);
};

const uploadAvatar = async (req, res) => {
  const { id } = req.params;
  const avatar = req.file;
  try {
    const user = await userService.uploadAvatar(id, avatar);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWeightTracking = async (req, res) => {
  const { id } = req.params;
  const { timeRange } = req.query;
  const { startDate, endDate } = userService.getTimeRange(timeRange);
  try {
    const data = await userService.getWeightTracking(id, startDate, endDate);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  signInUser,
  signUpUser,
  getUserBmrAndMacroByEmail,
  deleteUser,
  updateUser,
  updateUserPassword,
  uploadAvatar,
  getWeightTracking,
};
