var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var mongoose = require('mongoose');

var Product = require('../../../server/db/models/product');

describe('Product Model:' function (){
	
	beforeEach('Establish DB connection', function (done) {
	    if (mongoose.connection.db) return done();
	    mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
	    clearDB(done);
	});

	describe('Validations', function () {

		beforeEach(function() {
			var user = new User():
		});

		it('should validate product title', function (done) {
			user.validate(function(err) {
				console.log('product title validation err:', err);
				expect(err.errors).to.have.property('title');
				done();
			});
		});

		it('should validate product price', function (done) {
			user.validate(function(err) {
				console.log('product price validation err:', err);
				expect(err.errors).to.have.property('price');
				done();
			});
		});

		it('should validate product price is an integer', function (done) {
			user.price = "hello";

			user.validate(function(err) {
				console.log('product price integer validation err:', err);
				expect(err.name).to.equal('ValidationError'));
				done();
			});
		});

		it('should validate product description', function (done) {
			user.validate(function(err) {
				console.log('product description validation err:', err);
				expect(err.errors).to.have.property('description');
				done();
			});
		});

		it('should validate product stock', function (done) {
			user.validate(function(err) {
				console.log('product stock validation err:', err);
				expect(err.errors).to.have.property('stock');
				done();
			});
		});

		it('should validate product stock is an integer', function (done) {
			user.stock = "hello";

			user.validate(function(err) {
				console.log('product stock integer validation err:', err);
				expect(err.name).to.equal('ValidationError'));
				done();
			});
		});

		it('should validate product cost', function (done) {
			user.validate(function(err) {
				console.log('product cost validation err:', err);
				expect(err.errors).to.have.property('cost');
				done();
			});
		});

		it('should validate product cost is an integer', function (done) {
			user.cost = "hello";

			user.validate(function(err) {
				console.log('product cost integer validation err:', err);
				expect(err.name).to.equal('ValidationError'));
				done();
			});
		});

	});

	describe('Methods', function () {

		describe('getReviews Method', function () {
			it('should exist', function () {
				expect(Product.getReviews).to.be.a('function');
			});
		});

	});

	describe('Pre & Post Hooks', function () {
		// Test any hooks that should be executed during a document/db action
	});
});