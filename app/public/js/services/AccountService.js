'use strict';

/**
 * Controller of the viewsApp
 */
angular.module('snapApp')
	.service('AccountService', ['AccountFactory', '$q', function (AccountFactory, $q) {
		var defer = $q.defer();

		return {
			getAccount: function() {
				AccountFactory.query(function(account) {
					defer.resolve(account);
				});
				return defer.promise;
			},
			saveAccount: function(name, url) {
				AccountFactory.save({name: name, url: url}, function(account) {
					defer.resolve(account);
				});
				return defer.promise;
			},
			deleteAccount: function(accountID) {
				AccountFactory.delete({account_id: accountID}, function(account) {
					defer.resolve(account);
				});
				return defer.promise;
			},
			getAccountImage: function(accountID, url) {
				AccountFactory.getPreview({id: accountID, url: url}, function(account) {
					defer.resolve(account);
				});
				return defer.promise;
			},
		}
	}]);

