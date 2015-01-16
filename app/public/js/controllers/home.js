'use strict';

/**
 * Controller of the viewsApp
 */
angular.module('snapApp')
	.controller('HomeCtrl', ['$scope', '$resource', 'AccountService', 'socket', function ($scope, $resource, AccountService, socket) {

        //Get all accounts
        AccountService.getAccount().then(function(account){
            $scope.accounts = account;
        });

        //Save new account
		$scope.saveAccount = function() {
			var name = angular.element(document.querySelector('.js-account-name')).val();
			var url = angular.element(document.querySelector('.js-account-url')).val();

            if (name !== "" && url !== "") {
                AccountService.saveAccount(name, url).then(function(account) {
                    if (account.status === "ok") {
                        console.log(account);
                    };
                });
            }
		};

        socket.on('connect', function () {
            window.addEventListener('click', function(e) {
                var x = e.offsetX,y = e.offsetY;
                socket.emit('click', {
                    position: {
                        x: x,
                        y: y
                    },
                    screen: {
                        width: window.outerWidth,
                        h: window.outerWidth
                    }
                });
            }, false);
        });
	}]);


