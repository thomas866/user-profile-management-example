var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  id: { type: String, unique: true, index: true, required: true }, // login id
  password: { type: String, required: true, trim: true },
  name: { type: String, index: true, required: true }, // realname
  role: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  institute: { type: String },
  parent: { type: String },
  children: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
  }],
  address: { type: String },
  phone: { type: String },
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('user', userSchema);
