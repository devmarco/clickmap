'use strict';

/**
 * DIRECTIVE SLDIER
 */
angular.module('snapApp')
    .directive('preview', ['$compile', 'AccountService', 'helper', function ($compile, AccountService, helper) {
        return  {
            restrict: 'EAC',
            replace: false,
            scope: {
                idAttr: '@id',
                urlAttr: '@url',
                accAttr: '@account'
            },
            // template: '<span ng-hide="ok == true">Carregando Imagem</span><img ng-show="ok ==true" ng-src="data:image/png;base64,{{ image }}" alt="{{ name }}" />',
            template: '<span ng-hide="ok == true">Carregando Imagem</span><img ng-show="ok ==true" ng-src="{{ image }}" alt="{{ name }}" />',
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs, $document) {

                var id = $attrs.id,
                    url = $attrs.url,
                    account = $attrs.account;

                //Remove spaces and accents
                var AccRename = helper.fromFilename(account);

                if (localStorage.getItem(AccRename) === null) {
                    AccountService.getAccountImage(id, url).then(function(data){
                        if (data.status === 'ok') {
                            localStorage.setItem(AccRename, data.image);
                            $scope.image = data.image;
                            $scope.ok = true;
                        } else {
                            //Não foi possível carregar a imagem
                        };
                    });
                } else {
                    var LocalImage = localStorage.getItem(AccRename);
                    $scope.image = LocalImage;
                    $scope.ok = true;
                };
            }]};
    }]);
