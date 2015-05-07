// role: {type: String, enum: ['admin', 'shop manager', 'subscriber']},
var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
	// if (req.user){
	// 	console.log('user logged in!');
 //        return next();
	// }

 //    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
 //    res.redirect('/');
}

var isAdmin = function(req, res, next) {
	if ((isAuthenticated(req, res, next) && req.user.role === 'admin'))
		next();
	else
		res.status(401).end();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	// console.log('Not admin!');
 //    res.redirect('/');

}

var isShopManager = function(req, res, next) {
	if ((isAuthenticated(req, res, next) && req.user.role === 'shop manager'))
		next();
	else
		res.status(401).end();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	// console.log('Not shop manager!');
 //    res.redirect('/');
}

var isSubscriber = function(req, res, next) {
	if ((isAuthenticated(req, res, next) && req.user.role === 'subscriber'))
		next();
	else
		res.status(401).end();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	// console.log('Not subscriber!');
 //    res.redirect('/');	
}

module.exports = {
	'isAuthenticated': isAuthenticated,
	'isAdmin': isAdmin,
	'isShopManager': isShopManager,
	'isSubscriber': isSubscriber	
};