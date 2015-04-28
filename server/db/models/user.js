'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var addressSchema = require('./address');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    pastOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'}],
    billingAddress: [addressSchema],
    deliveryAddress: [addressSchema],
    roles: {type: String, enum: ['admin', 'shop manager', 'subscriber']},
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

schema.methods.getReviews = function() {
    return mongoose.model('Review').find({ user: this._id }).exec();
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);

// var User = mongoose.model('User', schema);
// var user = new User({name: "Sean Kim", username: 'srockk', email: 'nogever@gmail.com', roles: ['admin'], password: 'password'});

// user.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('user: ' + user.username + " saved.");
//   }
// });



