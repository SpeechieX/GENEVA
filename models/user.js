var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const SALT = 5;

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    transform: function(doc, ret) {
      // remove the password property when serializing doc to JSON
      delete ret.password;
      return ret;
    }
  });

userSchema.pre('save', function(next) {

    var user = this;
    console.log(user);
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT, function(err,hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  
  module.exports = mongoose.model('User', userSchema);