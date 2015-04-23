var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var mongoose = require('mongoose');

var Review = require('../../../server/db/models/review');

describe('Review Model:' function (){

	beforeEach('Establish DB connection', function (done) {
	    if (mongoose.connection.db) return done();
	    mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
	    clearDB(done);
	});

	describe('Validations', function () {

		beforeEach(function() {
			var review = new Review():
		});

		it('should validate review rating', function (done) {
			review.validate(function(err) {
				console.log('product title validation err:', err);
				expect(err.errors).to.have.property('title');
				done();
			});
		});

		it('should validate review rating min/max out of bounds', function (done) {
			review.rating = 6;

			review.validate(function(err) {
				console.log('product price integer validation err:', err);
				expect(err.name).to.equal('ValidationError'));
				done();
			});
		});

		it('should validate review body text', function (done) {
			review.validate(function(err) {
				console.log('product text validation err:', err);
				expect(err.errors).to.have.property('text');
				done();
			});
		});

		it('should validate review title', function (done) {
			review.validate(function(err) {
				console.log('product title validation err:', err);
				expect(err.errors).to.have.property('title');
				done();
			});
		});

	});

	describe('Methods'), function () {

	});

	describe('Pre & Post Hooks'), function () {

		it('should validate addition of date to review', function (done) {
			
		});

	});

});