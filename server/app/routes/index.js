'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/cart', require('./cart'));
router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/categories', require('./categories'));
router.use('/types', require('./types'));
router.use('/checkout', require('./checkout'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});


