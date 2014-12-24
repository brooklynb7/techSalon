'use strict';

angular.module('core').controller('CoreController', ['$scope', 'USER_ROLES',
	function($scope, USER_ROLES) {
		$scope.userRoles = USER_ROLES;
	}
]);