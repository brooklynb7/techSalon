'use strict';

(function() {
	// Crawlerdata Controller Spec
	describe('Crawlerdata Controller Tests', function() {
		// Initialize global variables
		var CrawlerdataController,
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

			// Initialize the Crawlerdata controller.
			CrawlerdataController = $controller('CrawlerdataController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Crawlerdatum object fetched from XHR', inject(function(Crawlerdata) {
			// Create sample Crawlerdatum using the Crawlerdata service
			var sampleCrawlerdatum = new Crawlerdata({
				name: 'New Crawlerdatum'
			});

			// Create a sample Crawlerdata array that includes the new Crawlerdatum
			var sampleCrawlerdata = [sampleCrawlerdatum];

			// Set GET response
			$httpBackend.expectGET('crawlerdata').respond(sampleCrawlerdata);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawlerdata).toEqualData(sampleCrawlerdata);
		}));

		it('$scope.findOne() should create an array with one Crawlerdatum object fetched from XHR using a crawlerdatumId URL parameter', inject(function(Crawlerdata) {
			// Define a sample Crawlerdatum object
			var sampleCrawlerdatum = new Crawlerdata({
				name: 'New Crawlerdatum'
			});

			// Set the URL parameter
			$stateParams.crawlerdatumId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/crawlerdata\/([0-9a-fA-F]{24})$/).respond(sampleCrawlerdatum);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawlerdatum).toEqualData(sampleCrawlerdatum);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Crawlerdata) {
			// Create a sample Crawlerdatum object
			var sampleCrawlerdatumPostData = new Crawlerdata({
				name: 'New Crawlerdatum'
			});

			// Create a sample Crawlerdatum response
			var sampleCrawlerdatumResponse = new Crawlerdata({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawlerdatum'
			});

			// Fixture mock form input values
			scope.name = 'New Crawlerdatum';

			// Set POST response
			$httpBackend.expectPOST('crawlerdata', sampleCrawlerdatumPostData).respond(sampleCrawlerdatumResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Crawlerdatum was created
			expect($location.path()).toBe('/crawlerdata/' + sampleCrawlerdatumResponse._id);
		}));

		it('$scope.update() should update a valid Crawlerdatum', inject(function(Crawlerdata) {
			// Define a sample Crawlerdatum put data
			var sampleCrawlerdatumPutData = new Crawlerdata({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawlerdatum'
			});

			// Mock Crawlerdatum in scope
			scope.crawlerdatum = sampleCrawlerdatumPutData;

			// Set PUT response
			$httpBackend.expectPUT(/crawlerdata\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/crawlerdata/' + sampleCrawlerdatumPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid crawlerdatumId and remove the Crawlerdatum from the scope', inject(function(Crawlerdata) {
			// Create new Crawlerdatum object
			var sampleCrawlerdatum = new Crawlerdata({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Crawlerdata array and include the Crawlerdatum
			scope.crawlerdata = [sampleCrawlerdatum];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/crawlerdata\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCrawlerdatum);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.crawlerdata.length).toBe(0);
		}));
	});
}());