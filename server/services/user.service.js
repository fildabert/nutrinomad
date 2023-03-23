const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UserModel = require('../models/user.model');
const FoodDiaryModel = require('../models/foodDiary.model');
const userValidator = require('../validators/user.validator');

const hashPassword = async (password) => {
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols.'
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const getAllUsers = async () => {
  const users = await UserModel.find().sort({ createdAt: -1 }); //Sort by newest
  return users;
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await UserModel.findById(id);
  return user;
};

const signUp = async (userData) => {
  const { error, value } = userValidator.createUserValidator.validate(userData);

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

  if (error) {
    throw Error(error.details[0].message);
  }

  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    throw Error('Someone already signed up with this email.');
  }

  const hash = await hashPassword(password);

  const user = await UserModel.create({
    name,
    email,
    password: hash,
    sex,
    age,
    height,
    weight,
    goal,
    activityLevel,
  });

  // Create a new food diary for the user
  const foodDiary = await FoodDiaryModel.create({ user: user._id });

  // Associate the food diary with the user
  user.foodDiary = foodDiary._id;
  await user.save();

  return user;
};

const signIn = async (email, password) => {
  const { error } = userValidator.signInValidator.validate({ email, password });
  if (error) {
    throw Error(error.details[0].message);
  }

  if (!email || !password) {
    throw Error('All fields must be filled.');
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw Error('Incorrect email.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error('Incorrect password.');
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

const deleteUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const user = await UserModel.findOne({ _id: id });

  // Find and delete the user's food diary
  if (user.foodDiary) {
    await FoodDiaryModel.findByIdAndDelete(user.foodDiary);
  }

  const deletedUser = await UserModel.findOneAndDelete({ _id: id });

  return deletedUser;
};

const updateUserById = async (id, userData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  try {
    const user = await getUserById(id);
    const { email: currentEmail } = user;

    if (userData.email !== currentEmail) {
      const emailExists = await UserModel.findOne({ email: userData.email });
      if (emailExists) {
        throw Error('Someone already signed up with this email.');
      }
    }

    const hash = await hashPassword(userData.password);
    userData.password = hash;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { ...userData },
      { new: true }
    );
    await updatedUser.calculateBmrAndMacroIntake();
    return updatedUser;
  } catch (error) {
    return { error: error.message };
  }
};

const userService = {
  getAllUsers,
  getUserById,
  signUp,
  signIn,
  getUserByEmail,
  deleteUserById,
  updateUserById,
};

module.exports = userService;