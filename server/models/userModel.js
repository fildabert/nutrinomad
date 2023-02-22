const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const activityLevelEnum = {
  SEDENTARY: 'sedentary',
  LIGHTLY_ACTIVE: 'lightly_active',
  ACTIVE: 'active',
  VERY_ACTIVE: 'very_active',
  INTENSELY_ACTIVE: 'intensely_active',
};

const sexEnum = {
  MALE: 'male',
  FEMALE: 'female',
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: Object.values(sexEnum),
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    activityLevel: {
      type: String,
      enum: Object.values(activityLevelEnum),
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  name,
  email,
  password,
  sex,
  age,
  height,
  weight,
  activityLevel
) {
  if (
    !name ||
    !email ||
    !password ||
    !sex ||
    !age ||
    !height ||
    !weight ||
    !activityLevel
  ) {
    throw Error('All fields must be filled.');
  }

  if (!validator.isEmail(email)) {
    throw Error('Invalid Email.');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough.');
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error('Someone already signed up with this email.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    sex,
    age,
    height,
    weight,
    activityLevel,
  });

  return user;
};

userSchema.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled.');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error('Incorrect password.');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
