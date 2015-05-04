'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var CartModel = mongoose.model('Cart');
var ProductModel = mongoose.model('Product');

var q = require('q');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        UserModel.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            // user.correctPassword is a method from our UserModel schema.
            if (!user || !user.correctPassword(password)) return done(null, false);
            // Properly authenticated.
            done(null, user);
        });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (err) {
                if (err) return next(err);
                // We respond with a reponse object that has user with _id and email.
                res.status(200).send({ user: _.omit(user.toJSON(), ['password', 'salt']) });

                var cartPromises = [];

                // cartPromises[0] = CartModel.find({session: req.sessionID}).exec(function(err, cart){
                //     // console.log('anonCart upon login', cart);
                //     // return cart;
                // });

                // cartPromises[1] = CartModel.find({userId: req.session.passport.user}).exec(function(err, cart){
                //     // console.log('userCart after login', cart);
                //     // return cart;
                // });

                CartModel.findOne({userId: req.session.passport.user}, {upsert: true}, function(err, userCart) { //
                    CartModel.findOne({session: req.sessionID}, function(err, sessionCart) {
                        if (err) res.status(500).send(err);                      
                        userCart.merge(sessionCart);
                        res.status(200).end();
                        console.log('userCart: ', userCart);
                    })

                });

                // q.all(cartPromises)
                // .then(function (results) {
                //     console.log('anon cart before merge', results[0]);
                //     console.log('user cart before merge', results[1]);
                //     results[1][0].merge(results[0][0]);
                //     console.log('anon cart after merge', results[0]);
                //     console.log('user cart after merge', results[1]);
                // })

            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};