//======================================
//get the packages we need =============
//======================================
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

//======================================
// Define a Schema =====================
//======================================
var Schema = mongoose.Schema;

//======================================
// Make Instance Of Schema =============
//======================================
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  displayName: String,
  picture: String,
  facebook: String,
  google: String,
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};
// userSchema.options.toJSON = {
//   transform: function(doc, ret, options) {
//     delete ret.password;
//     delete ret.passwordResetToken;
//     delete ret.passwordResetExpires;
//   }
// };

var User = mongoose.model('User', userSchema);
