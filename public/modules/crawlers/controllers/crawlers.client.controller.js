'use strict';

// Crawlers controller
angular.module('crawlers').controller('CrawlersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Crawlers',
	function($scope, $stateParams, $location, Authentication, Crawlers) {
		$scope.authentication = Authentication;

		// Create new Crawler
		$scope.create = function() {
			// Create new Crawler object
			var crawler = new Crawlers ({
				name: this.name,
				mainPage: this.mainPage,
				segment: this.segment
			});

			// Redirect after save
			crawler.$save(function(response) {
				$location.path('crawlers/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.mainPage = '';
				$scope.segment = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Crawler
		$scope.remove = function(crawler) {
			/*if ( crawler ) { 
				crawler.$remove();

				for (var i in $scope.crawlers) {
					if ($scope.crawlers [i] === crawler) {
						$scope.crawlers.splice(i, 1);
					}
				}
			} else {
				$scope.crawler.$remove(function() {
					$location.path('crawlers');
				});
			}*/
		};

		// Update existing Crawler
		$scope.update = function() {
			var crawler = $scope.crawler;

			crawler.$update(function() {
				$location.path('crawlers/' + crawler._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Crawlers
		$scope.find = function() {
			$scope.crawlers = Crawlers.query();
		};

		// Find existing Crawler
		$scope.findOne = function() {
			$scope.crawler = Crawlers.get({ 
				crawlerId: $stateParams.crawlerId
			});
		};
	}
]);