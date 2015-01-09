'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Crawlerdatum = mongoose.model('Crawlerdatum'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, crawlerdatum;

/**
 * Crawlerdatum routes tests
 */
describe('Crawlerdatum CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Crawlerdatum
		user.save(function() {
			crawlerdatum = {
				name: 'Crawlerdatum Name'
			};

			done();
		});
	});

	it('should be able to save Crawlerdatum instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawlerdatum
				agent.post('/crawlerdata')
					.send(crawlerdatum)
					.expect(200)
					.end(function(crawlerdatumSaveErr, crawlerdatumSaveRes) {
						// Handle Crawlerdatum save error
						if (crawlerdatumSaveErr) done(crawlerdatumSaveErr);

						// Get a list of Crawlerdata
						agent.get('/crawlerdata')
							.end(function(crawlerdataGetErr, crawlerdataGetRes) {
								// Handle Crawlerdatum save error
								if (crawlerdataGetErr) done(crawlerdataGetErr);

								// Get Crawlerdata list
								var crawlerdata = crawlerdataGetRes.body;

								// Set assertions
								(crawlerdata[0].user._id).should.equal(userId);
								(crawlerdata[0].name).should.match('Crawlerdatum Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Crawlerdatum instance if not logged in', function(done) {
		agent.post('/crawlerdata')
			.send(crawlerdatum)
			.expect(401)
			.end(function(crawlerdatumSaveErr, crawlerdatumSaveRes) {
				// Call the assertion callback
				done(crawlerdatumSaveErr);
			});
	});

	it('should not be able to save Crawlerdatum instance if no name is provided', function(done) {
		// Invalidate name field
		crawlerdatum.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawlerdatum
				agent.post('/crawlerdata')
					.send(crawlerdatum)
					.expect(400)
					.end(function(crawlerdatumSaveErr, crawlerdatumSaveRes) {
						// Set message assertion
						(crawlerdatumSaveRes.body.message).should.match('Please fill Crawlerdatum name');
						
						// Handle Crawlerdatum save error
						done(crawlerdatumSaveErr);
					});
			});
	});

	it('should be able to update Crawlerdatum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawlerdatum
				agent.post('/crawlerdata')
					.send(crawlerdatum)
					.expect(200)
					.end(function(crawlerdatumSaveErr, crawlerdatumSaveRes) {
						// Handle Crawlerdatum save error
						if (crawlerdatumSaveErr) done(crawlerdatumSaveErr);

						// Update Crawlerdatum name
						crawlerdatum.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Crawlerdatum
						agent.put('/crawlerdata/' + crawlerdatumSaveRes.body._id)
							.send(crawlerdatum)
							.expect(200)
							.end(function(crawlerdatumUpdateErr, crawlerdatumUpdateRes) {
								// Handle Crawlerdatum update error
								if (crawlerdatumUpdateErr) done(crawlerdatumUpdateErr);

								// Set assertions
								(crawlerdatumUpdateRes.body._id).should.equal(crawlerdatumSaveRes.body._id);
								(crawlerdatumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Crawlerdata if not signed in', function(done) {
		// Create new Crawlerdatum model instance
		var crawlerdatumObj = new Crawlerdatum(crawlerdatum);

		// Save the Crawlerdatum
		crawlerdatumObj.save(function() {
			// Request Crawlerdata
			request(app).get('/crawlerdata')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Crawlerdatum if not signed in', function(done) {
		// Create new Crawlerdatum model instance
		var crawlerdatumObj = new Crawlerdatum(crawlerdatum);

		// Save the Crawlerdatum
		crawlerdatumObj.save(function() {
			request(app).get('/crawlerdata/' + crawlerdatumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', crawlerdatum.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Crawlerdatum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawlerdatum
				agent.post('/crawlerdata')
					.send(crawlerdatum)
					.expect(200)
					.end(function(crawlerdatumSaveErr, crawlerdatumSaveRes) {
						// Handle Crawlerdatum save error
						if (crawlerdatumSaveErr) done(crawlerdatumSaveErr);

						// Delete existing Crawlerdatum
						agent.delete('/crawlerdata/' + crawlerdatumSaveRes.body._id)
							.send(crawlerdatum)
							.expect(200)
							.end(function(crawlerdatumDeleteErr, crawlerdatumDeleteRes) {
								// Handle Crawlerdatum error error
								if (crawlerdatumDeleteErr) done(crawlerdatumDeleteErr);

								// Set assertions
								(crawlerdatumDeleteRes.body._id).should.equal(crawlerdatumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Crawlerdatum instance if not signed in', function(done) {
		// Set Crawlerdatum user 
		crawlerdatum.user = user;

		// Create new Crawlerdatum model instance
		var crawlerdatumObj = new Crawlerdatum(crawlerdatum);

		// Save the Crawlerdatum
		crawlerdatumObj.save(function() {
			// Try deleting Crawlerdatum
			request(app).delete('/crawlerdata/' + crawlerdatumObj._id)
			.expect(401)
			.end(function(crawlerdatumDeleteErr, crawlerdatumDeleteRes) {
				// Set message assertion
				(crawlerdatumDeleteRes.body.message).should.match('User is not logged in');

				// Handle Crawlerdatum error error
				done(crawlerdatumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Crawlerdatum.remove().exec();
		done();
	});
});