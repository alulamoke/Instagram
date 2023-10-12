const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
      default: '/uploads/users/no-img.png',
    },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: [] },
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: [] },
    ],
    bio: String,
    website: String,
    gender: String,
    phone: String,
    facebook: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 'text', name: 'text' });

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("username doesn't exist.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("username and password doesn't match.");

  return user;
};

// Hash the plain text password before save
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;
