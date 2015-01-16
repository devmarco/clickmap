'use strict';

/**
 * Controller of the viewsApp
 */
angular.module('snapApp')
    .controller('DashboardCtrl', ['$scope', 'AccountService', 'socket', function ($scope, AccountService, socket) {

        //Create canvas preview
        var paper = new Raphael(document.getElementById('canvas'), '1300px', '100%');

        //Listener sockets
        socket.on('connect', function (data) {
            //GLOBALS
            var click = 0;

            socket.on('screenSize', function(data) {
                var preview = document.querySelector('.preview__area');
                preview.style.width = data.width;
                preview.style.height = data.height;
            });

            socket.on('clicked', function (data) {
                var x = data.position.x,
                    y = data.position.y;

                paper.circle(x, y, 2).animate({
                    fill: "#e91d24",
                    stroke: "#e91d24",
                    "stroke-width": 80,
                    "stroke-opacity": 0
                }, 2000);
            });
        });

    }]);



