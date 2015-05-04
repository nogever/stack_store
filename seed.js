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
var Review = mongoose.model('Review');
var Cart = mongoose.model('Cart');
var Address = require('./server/db/models/address');
var Options = require('./server/db/models/options');

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

var getCurrentCartData = function () {
    return q.ninvoke(Cart, 'find', {});
};

var getCurrentStoreData = function () {
    return q.ninvoke(Store, 'find', {});
};

var seedUsers = function () {

    var users = [
        {name:"Lei", username:"leiclearsky", roles:['admin'], email:"lei@gmail.com", password:'password'},
        {name:"Sean", username:"nogever", roles:['subscriber'], email:"nogever@fullstack.com", password:'password'},
        {name:"Pete", username:"pdedes", roles:['subscriber'], email:"pdedes@fullstack.com", password:'password'},
        {name:"Zeke", username:"znien", roles:['subscriber'], email:"znien@fullstack.com", password:'password'},
        {name:"Nimit", username:"nolimitnimit", roles:['admin'], email:"nolimitnimit@fullstack.com", password:'password'},
        {name:"Gabe", username:"nodeangel", roles:['subscriber'], email:"nodeangel@fullstack.com", password:'password'},
        {name:"David", username:"yanggang", roles:['subscriber'], email:"yanggang@fullstack.com", password:'password'},
        {name:"Omri", username:"ominous", roles:['subscriber'], email:"ominous@fullstack.com", password:'password'},
        {name:"Joe", username:"jalves", roles:['subscriber'], email:"jalves@fullstack.com", password:'password'},
        {name:"Charlotte", username:"char", roles:['subscriber'], email:"char@fullstack.com", password:'password'},

        {name:"Lei1", username:"leiclearsky1", roles:['admin'], email:"leiclearsky1@fullstack.com", password:'password'},
        {name:"Sean1", username:"nogever1", roles:['subscriber'], email:"nogever1@fullstack.com", password:'password'},
        {name:"Pete1", username:"pdedes1", roles:['subscriber'], email:"pdedes1@fullstack.com", password:'password'},
        {name:"Zeke1", username:"znien1", roles:['subscriber'], email:"znien1@fullstack.com", password:'password'},
        {name:"Nimit1", username:"nolimitnimit1", roles:['admin'], email:"nolimitnimit1@fullstack.com", password:'password'},
        {name:"Gabe1", username:"nodeangel1", roles:['subscriber'], email:"nodeangel1@fullstack.com", password:'password'},
        {name:"David1", username:"yanggang1", roles:['subscriber'], email:"yanggang1@fullstack.com", password:'password'},
        {name:"Omri1", username:"ominous1", roles:['subscriber'], email:"ominous1@fullstack.com", password:'password'},
        {name:"Joe1", username:"jalves1", roles:['subscriber'], email:"jalves1@fullstack.com", password:'password'},
        {name:"Charlotte1", username:"char1", roles:['subscriber'], email:"char1@fullstack.com", password:'password'},
        
        {name:"David2", username:"yanggang2", roles:['subscriber'], email:"yanggang2@fullstack.com", password:'password'},
        {name:"Omri2", username:"ominous2", roles:['subscriber'], email:"ominous2@fullstack.com", password:'password'},
        {name:"Joe2", username:"jalves2", roles:['subscriber'], email:"jalves2@fullstack.com", password:'password'},
        {name:"Charlotte2", username:"char2", roles:['subscriber'], email:"char2@fullstack.com", password:'password'}

    ]

    return q.invoke(User, 'create', users);

};

var reviews = [
        {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        {rating:2, text:"You guys suck!!!!", title:"Made me sick"},
        {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        {rating:2, text:"You guys suck!!!!",  title:"Made me sick"},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"},
        {rating:4, text:"Great drink, very tasty.", title:"Super taste"},
        {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        {rating:5, text:"Excellent product! Great service too!",  title:"Will buy again soon."}, 
        {rating:2, text:"You guys suck!!!!", title:"Made me sick"},
        
        {rating:5, text:"Excellent product! Great service too!", title:"Will buy again soon."},
        {rating:5, text:"Excellent product! Great service too!", title:"Will buy again soon."},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"},
        {rating:4, text:"Great drink, very tasty.", title:"Super taste"},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"},
        {rating:5, text:"Excellent product! Great service too!", title:"Will buy again soon."},
        {rating:2, text:"You guys suck!!!!", title:"Made me sick"},
        {rating:3, text:"Could be better.",  title:"Going to give it another shot"},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"},
        
        {rating:4, text:"Great drink, very tasty.", title:"Super taste"},
        {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        {rating:4, text:"Great drink, very tasty.", title:"Super taste"},
        {rating:3, text:"Could be better.", title:"Going to give it another shot"}
        // {rating:5, text:"Excellent product! Great service too!", title:"Will buy again soon."},
        // {rating:1, text:"Please close your business down", title:"Embarrassing!"},
        // {rating:4, text:"Great drink, very tasty.", title:"Super taste"},
        // {rating:1, text:"Please close your business down",  title:"Embarrassing!"},
        // {rating:1, text:"Please close your business down", title:"Embarrassing!"}
    ];

var seedReviews = function () {

    return q.invoke(Review, 'create', reviews);

}

var seedProducts = function () {

    var products = [
        {
            title:"Caffè Americano", 
            price:500, 
            description:"Caffè Americano or simply Americano (the name is also spelled with varying capitalization and use of diacritics: e.g. Café Americano, Cafe Americano, etc.) is a style of coffee prepared by adding hot water to espresso, giving a similar strength to but different flavor from regular drip coffee. ", 
            type: "coffee", 
            category: ["americano", "ice coffee", "decaf", "freshly brewed coffee"], 
            photo:"http://upload.wikimedia.org/wikipedia/commons/0/09/Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg", 
            reviews:null, 
            stock:2, 
            cost:98
        },
        {
            title:"Café Cubano", 
            price:700, 
            description:"Espresso which originated in Cuba after espresso machines were first imported there from Italy. Specifically, it refers to an espresso shot which is sweetened with demerara sugar as it is being brewed.", 
            type: "coffee", 
            category: ["espresso", "decaf", "ice", "freshly brewed coffee"], 
            photo:"http://upload.wikimedia.org/wikipedia/commons/f/f7/Linea_doubleespresso.jpg", 
            reviews:null, 
            stock:12, 
            cost:78
        },
        {
            title:"Caffè crema", 
            price:700, 
            description:"A long espresso drink primarily served in Switzerland and Austria and northern Italy", 
            type: "coffee", 
            category: ["espresso", "ice", "freshly brewed coffee"], 
            photo:"http://www.blogto.com/listings/cafes/upload/2010/10/201011015-crema_04.jpg", 
            reviews:null, 
            stock:1, 
            cost:88
        },
        {
            title:"Ristretto", 
            price:700, 
            description:"Short shot of espresso made with the normal amount of ground coffee but extracted with about half the amount of water.", 
            type: "coffee", 
            category: ["espresso", "decaf", "freshly brewed coffee"], 
            photo:"http://ineedcoffee.com/wp-content/uploads/2007/09/IMG_9259.jpg", 
            reviews:null, 
            stock:36, 
            cost:88
        },
        {
            title:"Mocha", 
            price:700, 
            description:"Typically one third espresso and two thirds steamed milk, but a portion of chocolate is added, typically in the form of a chocolate syrup, although other vending systems use instant chocolate powder.", 
            type: "coffee", 
            category: ["Mocha", "decaf", "ice", "freshly brewed coffee"], 
            photo:"http://upload.wikimedia.org/wikipedia/commons/5/58/Mocha_Latte_Costa_Rica.JPG", 
            reviews:null, 
            stock:6, 
            cost:98
        },
        {
            title:"Frappé", 
            price:500, 
            description:"Foam-covered iced coffee drink made from spray-dried instant coffee. It is very popular in Greece especially during summer, but has now spread on to other countries.", 
            type: "coffee", 
            category: ["Frappé", "freshly brewed coffee"], 
            photo:"http://upload.wikimedia.org/wikipedia/commons/7/73/Cafe-frape-glas-holztisch-unscharf.jpg", 
            reviews:null, 
            stock:12, 
            cost:98
        },
        {
            title:"Green Tea", 
            price:500, 
            description:"Green tea is made from the leaves from Camellia sinensis that have undergone minimal oxidation during processing.", 
            type: "tea", 
            category: ["green tea", "decaf", "ice"],
            photo:"http://upload.wikimedia.org/wikipedia/commons/c/cb/Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg", 
            reviews:null, 
            stock:32, 
            cost:38
        },
        {
            title:"Black Tea", 
            price:300, 
            description:"Tea that is more oxidized than oolong, green and white teas. All four types are made from leaves of the shrub Camellia sinensis. Black tea is generally stronger in flavor than the less oxidized teas.", 
            type: "tea", 
            category: ["black tea", "decaf", "ice"],
            photo:"http://www.motherearthliving.com/~/media/Images/MEL/Editorial/Articles/Magazine%20Articles/2011/12-01/Winter%20Drinks%20Turmeric-Black%20Tea%20Brew/black-tea.jpg", 
            reviews:null, 
            stock:20, 
            cost:88
        },
        {
            title:"Lotus Tea", 
            price:300, 
            description:"High-quality green tea leaves are placed within lotus flowers for a day to acquire the scent, then the tea leaves are removed and packaged.", 
            type: "tea", 
            category: ["Lotus Tea"],
            photo:"http://upload.wikimedia.org/wikipedia/commons/3/35/Vietnameselotustea.jpg", 
            reviews:null, 
            stock:16, 
            cost:48
        },
        {
            title:"Darjeeling Tea", 
            price:300, 
            description:"Yields a thin-bodied, light-coloured infusion with a floral aroma. The flavour can include a tinge of astringent tannic characteristics, and a musky spiciness sometimes described as ", 
            type: "tea", 
            category: ["Darjeeling Tea"],
            photo:"http://upload.wikimedia.org/wikipedia/commons/1/14/Darjeeling-tea-first-flush-in-cup.jpg", 
            reviews:null, 
            stock:38, 
            cost:78
        },
        {
            title:"Flowering Tea", 
            price:300, 
            description:"Consist each of a bundle of dried tea leaves wrapped around one or more dried flowers. These are made by binding tea leaves and flowers together into a bulb and are then set to dry.", 
            type: "tea", 
            category: ["Flowering Tea", "decaf"],
            photo:"http://upload.wikimedia.org/wikipedia/commons/e/ea/ExoticFlame.JPG", 
            reviews:null, 
            stock:37, 
            cost:68
        },
        {
            title:"Morroccan Menthe Tea", 
            price:300, 
            description:"A green tea prepared with spearmint leaves and sugar, traditional to the Maghreb region (Northwest Africa: Morocco, Algeria, and Tunisia).", 
            type: "tea", 
            category: ["Morroccan Menthe Tea"],
            photo:"http://upload.wikimedia.org/wikipedia/commons/6/6c/The_menthe.jpg", 
            reviews:null, 
            stock:23, 
            cost:88
        }
    ];

    return q.invoke(Product, 'create', products);
}

var seedCart = function () {

    var carts = [
        { 
            products: [
                {  
                    productId: 01234567,  
                    options: [{ sweets: "honey", size: "fullstack"}], 
                    quantity: 1,
                    price: 500
                },
                {  
                    productId: 98765432,  
                    options: [{ sweets: "raw sugar", milk: "soy", size: "smallstack"}], 
                    quantity: 1,
                    price: 250
                },
                {  
                    productId: 99992221,  
                    options: [{ sweets: "splenda", size: "mediumstack", toppings: "cocoa powder"}], 
                    quantity: 1,
                    price: 475
                },
            ],
            subTotal:1000,
            tax:825, 
            total:1083
        }
    ]

    return q.invoke(Cart, 'create', carts);

};

var seedStores = function () {

    var stores = [
        {
            storeName: "Chelsea",
            storeLocation: [{
                address: "270 W. 17th Street",
                city: "New York",
                state: "NY",
                phone: "201.555.5555",
                zip: "10011"}]
        },
        {
            storeName: "Lower East Side",
            storeLocation: [{
                address: "111 1st Ave.",
                city: "New York",
                state: "NY",
                phone: "201.555.1234",
                zip: "10009"}]
        },
        {
            storeName: "Hell's Kitchen",
            storeLocation: [{
                address: "32nd St. and 8th Ave.",
                city: "New York",
                state: "NY",
                phone: "201.444.3214",
                zip: "10019"}]
        },
        {
            storeName: "Financial District",
            storeLocation: [{
                address: "5 Hanover Sq.",
                city: "New York",
                state: "NY",
                phone: "201.555.5555",
                zip: "10004"}]
        },
        {
            storeName: "West Village",
            storeLocation: [{
                address: "270 W. 17th Street",
                city: "New York",
                state: "NY",
                phone: "201.333.3215",
                zip: "10014"}]
        }
    ];

    return q.invoke(Store, 'create', stores);

};

connectToDb.then(function () {
    getCurrentUserData()
    .then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('User data already exists, exiting!'));
            // process.kill(0);
        }
    })
    .then(getCurrentProductData)
    .then(function (products) {
            if (products.length === 0) {
                return seedProducts();
            } else {
                console.log(chalk.magenta('Product data already exists, exiting!'));
                // process.kill(0);
            }
    })
    .then(function () {
        return User.find().exec(function(err, users) {
            console.log(chalk.green('seed users to reviews'));
            reviews.forEach(function(review, index) {
                // console.log(chalk.green('user id', users[index]));
                var user = users[index];
                review.user = user._id;
            })
        });
    })
    .then(getCurrentReviewData)
    .then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Review data already exists, exiting!'));
            // process.kill(0);
        }
    })
    .then(getCurrentCartData)
    .then(function(carts) {
        if(carts.length === 0) {
            return seedCart();
        } else {
            console.log(chalk.magenta('Cart data already exists, exiting!'));
        }
    })
    .then(getCurrentStoreData)
    .then(function(stores) {
        // console.log(stores);
        // console.log(Address);
        if(stores.length === 0) {
            return seedStores();
        } else {
            console.log(chalk.magenta('Store data already exists, exiting!'));
        }
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        console.log(err.stack);
        // process.kill(1);
    });

    // getCurrentProductData().then(function (products) {
    //     if (products.length === 0) {
    //         return seedProducts();
    //     } else {
    //         console.log(chalk.magenta('Product data already exists, exiting!'));
    //         process.kill(0);
    //     }
    // }).then(function () {
    //     console.log(chalk.green('Seed successful!'));
    //     process.kill(0);
    // }).catch(function (err) {
    //     console.error(err);
    //     // process.kill(1);
    // });

    // getCurrentStoreData().then(function (stores) {
    //     if (stores.length === 0) {
    //         return seedStores();
    //     } else {
    //         console.log(chalk.magenta('Store data already exists, exiting!'));
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