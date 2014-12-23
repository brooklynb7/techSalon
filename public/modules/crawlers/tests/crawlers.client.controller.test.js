'use strict';

(function() {
	// Crawlers Controller Spec
	describe('Crawlers Controller Tests', function() {
		// Initialize global variables
		var CrawlersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Crawlers controller.
			CrawlersController = $controller('CrawlersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Crawler object fetched from XHR', inject(function(Crawlers) {
			// Create sample Crawler using the Crawlers service
			var sampleCrawler = new Crawlers({
				name: 'New Crawler'
			});

			// Create a sample Crawlers array that includes the new Crawler
			var sampleCrawlers = [sampleCrawler];

			// Set GET response
			$httpBackend.expectGET('crawlers').respond(sampleCrawlers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawlers).toEqualData(sampleCrawlers);
		}));

		it('$scope.findOne() should create an array with one Crawler object fetched from XHR using a crawlerId URL parameter', inject(function(Crawlers) {
			// Define a sample Crawler object
			var sampleCrawler = new Crawlers({
				name: 'New Crawler'
			});

			// Set the URL parameter
			$stateParams.crawlerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/crawlers\/([0-9a-fA-F]{24})$/).respond(sampleCrawler);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawler).toEqualData(sampleCrawler);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Crawlers) {
			// Create a sample Crawler object
			var sampleCrawlerPostData = new Crawlers({
				name: 'New Crawler'
			});

			// Create a sample Crawler response
			var sampleCrawlerResponse = new Crawlers({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawler'
			});

			// Fixture mock form input values
			scope.name = 'New Crawler';

			// Set POST response
			$httpBackend.expectPOST('crawlers', sampleCrawlerPostData).respond(sampleCrawlerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Crawler was created
			expect($location.path()).toBe('/crawlers/' + sampleCrawlerResponse._id);
		}));

		it('$scope.update() should update a valid Crawler', inject(function(Crawlers) {
			// Define a sample Crawler put data
			var sampleCrawlerPutData = new Crawlers({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawler'
			});

			// Mock Crawler in scope
			scope.crawler = sampleCrawlerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/crawlers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/crawlers/' + sampleCrawlerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid crawlerId and remove the Crawler from the scope', inject(function(Crawlers) {
			// Create new Crawler object
			var sampleCrawler = new Crawlers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Crawlers array and include the Crawler
			scope.crawlers = [sampleCrawler];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/crawlers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCrawler);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.crawlers.length).toBe(0);
		}));
	});
}());