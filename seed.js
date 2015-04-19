/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');

var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Store = mongoose.model('Store');
var Address = mongoose.model('Address');

var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

// var getCurrentProductData = function () {
//     return q.ninvoke(Product, 'find', {});
// };

var getCurrentStoreData = function () {
    return q.ninvoke(Store, 'find', {});
    console.log("getCurrentStoreData executed");
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return q.invoke(User, 'create', users);

};

var seedStores = function () {

    var stores = [
        {
            storeName: "Chelsea",
            storeLocation: [new Address({
                address: "270 W. 17th Street",
                city: "New York",
                state: "NY",
                phone: "201.555.5555",
                zip: "10011"})]
        },
        {
            storeName: "Lower East Side",
            storeLocation: [new Address({
                address: "111 1st Ave.",
                city: "New York",
                state: "NY",
                phone: "201.555.1234",
                zip: "10009"})]
        },
        {
            storeName: "Hell's Kitchen",
            storeLocation: [new Address({
                address: "32nd St. and 8th Ave.",
                city: "New York",
                state: "NY",
                phone: "201.444.3214",
                zip: "10019"})]
        },
        {
            storeName: "Financial District",
            storeLocation: [new Address({
                address: "5 Hanover Sq.",
                city: "New York",
                state: "NY",
                phone: "201.555.5555",
                zip: "10004"})]
        },
        {
            storeName: "West Village",
            storeLocation: [new Address({
                address: "270 W. 17th Street",
                city: "New York",
                state: "NY",
                phone: "201.333.3215",
                zip: "10014"})]
        }
    ];

    return q.invoke(Store, 'create', stores);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });

    getCurrentStoreData().then(function (stores) {
        if (stores.length === 0) {
            return seedStores();
        } else {
            console.log(chalk.magenta('Seems to already be store data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});