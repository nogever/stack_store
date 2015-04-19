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

// Querying the database for collections
var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var getCurrentReviewData = function () {
    return q.ninvoke(Review, 'find', {});
};

var getCurrentProductData = function () {
    return q.ninvoke(Product, 'find', {});
};

var getCurrentStoreData = function () {
    return q.ninvoke(Store, 'find', {});
};

var seedUsers = function () {

    var users = [
        {name:"Lei", username:"leiclearsky", admin:"true", email:"leiclearsky@fullstack.com"},
        {name:"Sean", username:"nogever", admin:"false", email:"nogever@fullstack.com"},
        {name:"Pete", username:"pdedes", admin:"false", email:"pdedes@fullstack.com"},
        {name:"Zeke", username:"znien", admin:"false", email:"znien@fullstack.com"},
        {name:"Nimit", username:"nolimitnimit", admin:"true", email:"nolimitnimit@fullstack.com"},
        {name:"Gabe", username:"nodeangel", admin:"false", email:"nodeangel@fullstack.com"},
        {name:"David", username:"yanggang", admin:"false", email:"yanggang@fullstack.com"},
        {name:"Omri", username:"ominous", admin:"false", email:"ominous@fullstack.com"},
        {name:"Joe", username:"jalves", admin:"false", email:"jalves@fullstack.com"},
        {name:"Charlotte", username:"char", admin:"false", email:"char@fullstack.com"}
    ]

    // var users = [
    //     {
    //         email: 'testing@fsa.com',
    //         password: 'password'
    //     },
    //     {
    //         email: 'obama@gmail.com',
    //         password: 'potus'
    //     }
    // ];

    return q.invoke(User, 'create', users);

};

var seedReviews = function () {

    var reviews = [
        {rating:1, text:"Please close your business down", date:"9/27/15", title:"Embarrassing!"},
        {rating:1, text:"Please close your business down", date:"11/2/15", title:"Embarrassing!"},
        {rating:2, text:"You guys suck!!!!", date:"5/28/15", title:"Made me sick"},
        {rating:1, text:"Please close your business down", date:"9/20/15", title:"Embarrassing!"},
        {rating:2, text:"You guys suck!!!!", date:"10/18/15", title:"Made me sick"},
        {rating:3, text:"Could be better.", date:"1/22/15", title:"Going to give it another shot"},
        {rating:4, text:"Great drink, very tasty.", date:"6/28/15", title:"Super taste"},
        {rating:1, text:"Please close your business down", date:"11/4/15", title:"Embarrassing!"},
        {rating:5, text:"Excellent product! Great service too!", date:"12/16/15", title:"Will buy again soon."},
        {rating:2, text:"You guys suck!!!!", date:"1/25/15", title:"Made me sick"},
        {rating:5, text:"Excellent product! Great service too!", date:"6/12/15", title:"Will buy again soon."},
        {rating:5, text:"Excellent product! Great service too!", date:"3/23/15", title:"Will buy again soon."},
        {rating:3, text:"Could be better.", date:"9/5/15", title:"Going to give it another shot"},
        {rating:4, text:"Great drink, very tasty.", date:"7/15/15", title:"Super taste"},
        {rating:3, text:"Could be better.", date:"8/2/15", title:"Going to give it another shot"},
        {rating:5, text:"Excellent product! Great service too!", date:"5/22/15", title:"Will buy again soon."},
        {rating:2, text:"You guys suck!!!!", date:"3/1/15", title:"Made me sick"},
        {rating:3, text:"Could be better.", date:"11/24/15", title:"Going to give it another shot"},
        {rating:3, text:"Could be better.", date:"11/5/15", title:"Going to give it another shot"},
        {rating:3, text:"Could be better.", date:"2/12/15", title:"Going to give it another shot"},
        {rating:4, text:"Great drink, very tasty.", date:"1/19/15", title:"Super taste"},
        {rating:1, text:"Please close your business down", date:"9/30/15", title:"Embarrassing!"},
        {rating:4, text:"Great drink, very tasty.", date:"12/8/15", title:"Super taste"},
        {rating:3, text:"Could be better.", date:"4/7/15", title:"Going to give it another shot"},
        {rating:5, text:"Excellent product! Great service too!", date:"9/5/15", title:"Will buy again soon."},
        {rating:1, text:"Please close your business down", date:"2/3/15", title:"Embarrassing!"},
        {rating:4, text:"Great drink, very tasty.", date:"6/12/15", title:"Super taste"},
        {rating:1, text:"Please close your business down", date:"11/14/15", title:"Embarrassing!"},
        {rating:1, text:"Please close your business down", date:"4/26/15", title:"Embarrassing!"}
    ];

    return q.invoke(Review, 'create', reviews);

}

var seedProducts = function () {

    var products = [
        {id:1, title:"Caffè Americano", price:5.00, description:"Caffè Americano or simply Americano (the name is also spelled with varying capitalization and use of diacritics: e.g. Café Americano, Cafe Americano, etc.) is a style of coffee prepared by adding hot water to espresso, giving a similar strength to but different flavor from regular drip coffee. ", category:"Coffee", photo:"http://upload.wikimedia.org/wikipedia/commons/0/09/Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg", reviews:null, stock:2, cost:0.89, sale:"false", discount:0.2},
        {id:2, title:"Café Cubano", price:5.00, description:"Espresso which originated in Cuba after espresso machines were first imported there from Italy. Specifically, it refers to an espresso shot which is sweetened with demerara sugar as it is being brewed.", category:"Coffee", photo:"http://upload.wikimedia.org/wikipedia/commons/f/f7/Linea_doubleespresso.jpg", reviews:null, stock:12, cost:0.67, sale:"false", discount:0.2},
        {id:3, title:"Caffè crema", price:6.00, description:"A long espresso drink primarily served in Switzerland and Austria and northern Italy", category:"Coffee", photo:"http://www.blogto.com/listings/cafes/upload/2010/10/201011015-crema_04.jpg", reviews:null, stock:1, cost:0.98, sale:"false", discount:0.2},
        {id:4, title:"Ristretto", price:3.00, description:"Short shot of espresso made with the normal amount of ground coffee but extracted with about half the amount of water.", category:"Coffee", photo:"http://ineedcoffee.com/wp-content/uploads/2007/09/IMG_9259.jpg", reviews:null, stock:36, cost:0.78, sale:"true", discount:0.2},
        {id:5, title:"Mocha ", price:6.00, description:"Typically one third espresso and two thirds steamed milk, but a portion of chocolate is added, typically in the form of a chocolate syrup, although other vending systems use instant chocolate powder.", category:"Coffee", photo:"http://upload.wikimedia.org/wikipedia/commons/5/58/Mocha_Latte_Costa_Rica.JPG", reviews:null, stock:6, cost:0.59, sale:"true", discount:0.2},
        {id:6, title:"Frappé", price:4.00, description:"Foam-covered iced coffee drink made from spray-dried instant coffee. It is very popular in Greece especially during summer, but has now spread on to other countries.", category:"Coffee", photo:"http://upload.wikimedia.org/wikipedia/commons/7/73/Cafe-frape-glas-holztisch-unscharf.jpg", reviews:null, stock:12, cost:0.29, sale:"false", discount:0.2},
        {id:7, title:"Green Tea", price:4.00, description:"Green tea is made from the leaves from Camellia sinensis that have undergone minimal oxidation during processing.", category:"Tea", photo:"http://upload.wikimedia.org/wikipedia/commons/c/cb/Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg", reviews:null, stock:32, cost:0.03, sale:"true", discount:0.2},
        {id:8, title:"Black Tea", price:2.00, description:"Tea that is more oxidized than oolong, green and white teas. All four types are made from leaves of the shrub Camellia sinensis. Black tea is generally stronger in flavor than the less oxidized teas.", category:"Tea", photo:"http://www.motherearthliving.com/~/media/Images/MEL/Editorial/Articles/Magazine%20Articles/2011/12-01/Winter%20Drinks%20Turmeric-Black%20Tea%20Brew/black-tea.jpg", reviews:null, stock:20, cost:0.08, sale:"false", discount:0.2},
        {id:9, title:"Lotus Tea", price:4.00, description:"High-quality green tea leaves are placed within lotus flowers for a day to acquire the scent, then the tea leaves are removed and packaged.", category:"Tea", photo:"http://upload.wikimedia.org/wikipedia/commons/3/35/Vietnameselotustea.jpg", reviews:null, stock:16, cost:0.94, sale:"false", discount:0.2},
        {id:10, title:"Darjeeling Tea", price:3.00, description:"Yields a thin-bodied, light-coloured infusion with a floral aroma. The flavour can include a tinge of astringent tannic characteristics, and a musky spiciness sometimes described as ", category:"Tea", photo:"http://upload.wikimedia.org/wikipedia/commons/1/14/Darjeeling-tea-first-flush-in-cup.jpg", reviews:null, stock:38, cost:0.07, sale:"false", discount:0.2},
        {id:11, title:"Flowering Tea", price:7.00, description:"Consist each of a bundle of dried tea leaves wrapped around one or more dried flowers. These are made by binding tea leaves and flowers together into a bulb and are then set to dry.", category:"Tea", photo:"http://upload.wikimedia.org/wikipedia/commons/e/ea/ExoticFlame.JPG", reviews:null, stock:37, cost:0.96, sale:"false", discount:0.2},
        {id:12, title:"Morroccan Menthe Tea", price:6.00, description:"A green tea prepared with spearmint leaves and sugar, traditional to the Maghreb region (Northwest Africa: Morocco, Algeria, and Tunisia).", category:"Tea", photo:"http://upload.wikimedia.org/wikipedia/commons/6/6c/The_menthe.jpg", reviews:null, stock:23, cost:0.08, sale:"false", discount:0.2}
    ];

    return q.invoke(Product, 'create', products);
}

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
            console.log(chalk.magenta('User data already exists, exiting!'));
            // process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        // process.kill(0);
    }).catch(function (err) {
        console.error(err);
        // process.kill(1);
    });



    getCurrentReviewData().then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Review data already exists, exiting!'));
            // process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        // process.kill(0);
    }).catch(function (err) {
        console.error(err);
        // process.kill(1);
    });



    getCurrentProductData().then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Product data already exists, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        // process.kill(1);
    });

    // getCurrentStoreData().then(function (stores) {
    //     if (stores.length === 0) {
    //         return seedStores();
    //     } else {
    //         console.log(chalk.magenta('Seems to already be store data, exiting!'));
    //         // process.kill(0);
    //     }
    // }).then(function () {
    //     console.log(chalk.green('Seed successful!'));
    //     // process.kill(0);
    // }).catch(function (err) {
    //     console.error(err);
    //     // process.kill(1);
    // });
});