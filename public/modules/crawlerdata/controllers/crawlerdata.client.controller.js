'use strict';

// Crawlerdata controller
angular.module('crawlerdata').controller('CrawlerdataController', ['$scope', '$stateParams', '$location', 'Authentication', 'Crawlerdata',
	function($scope, $stateParams, $location, Authentication, Crawlerdata) {
		$scope.authentication = Authentication;

		// Create new Crawlerdatum
		$scope.create = function() {
			// Create new Crawlerdatum object
			var crawlerdatum = new Crawlerdata ({
				name: this.name
			});

			// Redirect after save
			crawlerdatum.$save(function(response) {
				$location.path('crawlerdata/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Crawlerdatum
		$scope.remove = function(crawlerdatum) {
			if ( crawlerdatum ) { 
				crawlerdatum.$remove();

				for (var i in $scope.crawlerdata) {
					if ($scope.crawlerdata [i] === crawlerdatum) {
						$scope.crawlerdata.splice(i, 1);
					}
				}
			} else {
				$scope.crawlerdatum.$remove(function() {
					$location.path('crawlerdata');
				});
			}
		};

		// Update existing Crawlerdatum
		$scope.update = function() {
			var crawlerdatum = $scope.crawlerdatum;

			crawlerdatum.$update(function() {
				$location.path('crawlerdata/' + crawlerdatum._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Crawlerdata
		$scope.find = function() {
			$scope.crawlerdata = Crawlerdata.query();
		};

		// Find existing Crawlerdatum
		$scope.findOne = function() {
			$scope.crawlerdatum = Crawlerdata.get({ 
				crawlerdatumId: $stateParams.crawlerdatumId
			});
		};
	}
]);