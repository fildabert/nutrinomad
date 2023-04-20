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

  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).toString();
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
    weightTracking: [{ weight, date: formattedDate }],
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
    const { error, value } = userValidator.updateUserValidator.validate(
      userData,
      { stripUnknown: true }
    );

    if (error) {
      throw Error(error.details[0].message);
    }

    const user = await getUserById(id);
    const { email: currentEmail } = user;

    if (value.email !== currentEmail) {
      const emailExists = await UserModel.findOne({ email: value.email });
      if (emailExists) {
        throw Error('Someone already signed up with this email.');
      }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { ...value, password: user.password },
      { new: true }
    );

    //weight tracking
    if (value.weight && value !== user.weight) {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10).toString(); // format date as YYYY-MM-DD
      const existingEntryIndex = updatedUser.weightTracking.findIndex(
        (entry) => entry.date === formattedDate
      );
      if (existingEntryIndex > -1) {
        // If an entry already exists for this date, overwrite it
        updatedUser.weightTracking[existingEntryIndex].weight = value.weight;
      } else {
        // Otherwise, add a new entry to the array
        updatedUser.weightTracking.push({
          date: formattedDate,
          weight: value.weight,
        });
      }
      await updatedUser.save();
    }

    if (value.avatar) {
      updatedUser.avatar = value.avatar;
      await updatedUser.save();
    }
    await updatedUser.calculateBmrAndMacroIntake();
    await updatedUser.calculateMinMicroIntake();
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw Error('Error comparing passwords');
  }
};

const updateUserPasswordById = async (id, currentPassword, newPassword) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  try {
    const user = await getUserById(id);
    const isPasswordMatched = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordMatched) {
      throw Error('Incorrect password');
    }
    const hash = await hashPassword(newPassword);
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { password: hash },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const uploadAvatar = async (id, avatar) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (avatar && avatar.buffer) {
      // check if avatar object is defined and has a buffer property
      user.avatar = avatar.buffer.toString('base64');
    }
    await user.save();
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

const getWeightTracking = async (userId, startDate, endDate) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const weightTracking = user.weightTracking.filter((record) => {
    const date = Date.parse(record.date);
    return date >= startDate && date <= endDate;
  });
  const formattedData = weightTracking.map((record) => ({
    x: record.date,
    y: record.weight,
  }));

  return formattedData;
};

const getTimeRange = (timeRange) => {
  let startDate, endDate;

  switch (timeRange) {
    case '7days':
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30days':
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90days':
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 90);
      break;
    default:
      startDate = req.query.startDate ? new Date(req.query.startDate) : null;
      endDate = req.query.endDate ? new Date(req.query.endDate) : null;
      break;
  }

  return { startDate, endDate };
};

const userService = {
  getAllUsers,
  getUserById,
  signUp,
  signIn,
  getUserByEmail,
  deleteUserById,
  updateUserById,
  updateUserPasswordById,
  uploadAvatar,
  getWeightTracking,
  getTimeRange,
};

module.exports = userService;
