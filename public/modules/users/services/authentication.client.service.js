'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['hasIntersectionFilter',
	function(hasIntersectionFilter) {
		var _this = this;

		var authService = {
			user: window.user
		};

		authService.isAuthenticated = function() {			
			return !! authService.user._id;
		};

		authService.isAuthorized = function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() &&
				hasIntersectionFilter(authorizedRoles, authService.user.roles));
		};

		return authService;
	}
]);