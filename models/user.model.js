const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    __v: {
      type: Number,
      select: false
    }
  });

  schema.statics.generateHash = async function (password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  };

  schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = mongoose.model('users', schema);

  return User;
};


/*
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        __v: {
            type: Number,
            select: false
        }
    });

    schema.statics.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
    };

    // Authenticate without save salt on database
    schema.methods.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    const User = mongoose.model('users', schema);

    return User;
};*/