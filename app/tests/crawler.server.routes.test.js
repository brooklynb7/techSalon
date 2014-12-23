'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Crawler = mongoose.model('Crawler'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, crawler;

/**
 * Crawler routes tests
 */
describe('Crawler CRUD tests', function() {
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

		// Save a user to the test db and create new Crawler
		user.save(function() {
			crawler = {
				name: 'Crawler Name'
			};

			done();
		});
	});

	it('should be able to save Crawler instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawler
				agent.post('/crawlers')
					.send(crawler)
					.expect(200)
					.end(function(crawlerSaveErr, crawlerSaveRes) {
						// Handle Crawler save error
						if (crawlerSaveErr) done(crawlerSaveErr);

						// Get a list of Crawlers
						agent.get('/crawlers')
							.end(function(crawlersGetErr, crawlersGetRes) {
								// Handle Crawler save error
								if (crawlersGetErr) done(crawlersGetErr);

								// Get Crawlers list
								var crawlers = crawlersGetRes.body;

								// Set assertions
								(crawlers[0].user._id).should.equal(userId);
								(crawlers[0].name).should.match('Crawler Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Crawler instance if not logged in', function(done) {
		agent.post('/crawlers')
			.send(crawler)
			.expect(401)
			.end(function(crawlerSaveErr, crawlerSaveRes) {
				// Call the assertion callback
				done(crawlerSaveErr);
			});
	});

	it('should not be able to save Crawler instance if no name is provided', function(done) {
		// Invalidate name field
		crawler.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawler
				agent.post('/crawlers')
					.send(crawler)
					.expect(400)
					.end(function(crawlerSaveErr, crawlerSaveRes) {
						// Set message assertion
						(crawlerSaveRes.body.message).should.match('Please fill Crawler name');
						
						// Handle Crawler save error
						done(crawlerSaveErr);
					});
			});
	});

	it('should be able to update Crawler instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawler
				agent.post('/crawlers')
					.send(crawler)
					.expect(200)
					.end(function(crawlerSaveErr, crawlerSaveRes) {
						// Handle Crawler save error
						if (crawlerSaveErr) done(crawlerSaveErr);

						// Update Crawler name
						crawler.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Crawler
						agent.put('/crawlers/' + crawlerSaveRes.body._id)
							.send(crawler)
							.expect(200)
							.end(function(crawlerUpdateErr, crawlerUpdateRes) {
								// Handle Crawler update error
								if (crawlerUpdateErr) done(crawlerUpdateErr);

								// Set assertions
								(crawlerUpdateRes.body._id).should.equal(crawlerSaveRes.body._id);
								(crawlerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Crawlers if not signed in', function(done) {
		// Create new Crawler model instance
		var crawlerObj = new Crawler(crawler);

		// Save the Crawler
		crawlerObj.save(function() {
			// Request Crawlers
			request(app).get('/crawlers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Crawler if not signed in', function(done) {
		// Create new Crawler model instance
		var crawlerObj = new Crawler(crawler);

		// Save the Crawler
		crawlerObj.save(function() {
			request(app).get('/crawlers/' + crawlerObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', crawler.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Crawler instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawler
				agent.post('/crawlers')
					.send(crawler)
					.expect(200)
					.end(function(crawlerSaveErr, crawlerSaveRes) {
						// Handle Crawler save error
						if (crawlerSaveErr) done(crawlerSaveErr);

						// Delete existing Crawler
						agent.delete('/crawlers/' + crawlerSaveRes.body._id)
							.send(crawler)
							.expect(200)
							.end(function(crawlerDeleteErr, crawlerDeleteRes) {
								// Handle Crawler error error
								if (crawlerDeleteErr) done(crawlerDeleteErr);

								// Set assertions
								(crawlerDeleteRes.body._id).should.equal(crawlerSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Crawler instance if not signed in', function(done) {
		// Set Crawler user 
		crawler.user = user;

		// Create new Crawler model instance
		var crawlerObj = new Crawler(crawler);

		// Save the Crawler
		crawlerObj.save(function() {
			// Try deleting Crawler
			request(app).delete('/crawlers/' + crawlerObj._id)
			.expect(401)
			.end(function(crawlerDeleteErr, crawlerDeleteRes) {
				// Set message assertion
				(crawlerDeleteRes.body.message).should.match('User is not logged in');

				// Handle Crawler error error
				done(crawlerDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Crawler.remove().exec();
		done();
	});
});