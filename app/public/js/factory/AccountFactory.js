'use strict';

/**
 * Controller of the viewsApp
 */
angular.module('snapApp')
	.service('AccountFactory', ['$resource', function ($resource) {
		return $resource('/api/account/:account_id:id/:route',
        {
            account_id: '@id',
            route: '@route',
        },
        {
            getPreview: {method: 'POST', params: {route: 'image'}}
        });
	}]);
