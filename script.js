// module

var mainApp = angular.module('mainApp', ['ngRoute']);

// routes

mainApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: 'home.html', controller: 'homeController' })
        .when('/about', { templateUrl: '/about.html', controller: 'aboutController' })
        .when('/help', { templateUrl: 'help.html', controller: 'helpController' })
        .when('/addContact', { templateUrl: 'contact.html', controller: 'addContactController' })
        .when('/listContacts', { templateUrl: 'contacts.html', controller: 'listContactsController' })
        .when('/editContact/:_id', { templateUrl: 'contact.html', controller: 'editContactController' })
        .otherwise({ templateUrl: 'home.html', controller: 'homeController' });

    $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!')
});

// controllers

mainApp.controller('mainController', function ($scope) {
    $scope.bannerTitle = 'SPA Example';
    $scope.bannerSubTitle = 'using HTML5, AngularJS, Node.js, and MongoDB';
    $scope.pageTitle = 'Contacts';
    $scope.pageMessage = 'Morbi ullamcorper auctor convallis quam turpis molestie eget sem, leo cras velit lacus vulputate imperdiet molestie, gravida suscipit facilisis sagittis per fusce ante.';
    $scope.currentDate = new Date();
});

mainApp.controller('homeController', function ($scope) {
    $scope.message = 'Home page message...';
});

mainApp.controller('aboutController', function ($scope) {
    $scope.message = 'About page message...';
});

mainApp.controller('helpController', function ($scope) {
    $scope.message = 'Help page message...';
});

mainApp.controller('addContactController', function ($scope) {
    $scope.message = 'Add New Contact'

    $scope.saveContact = function() {
        alert('Save is not ready yet.');
    };
});

mainApp.controller('listContactsController', function ($scope, $http) {
    $http.get('http://localhost:3000/contact')
        .success(function(data, status, headers, config, statusText) { $scope.contacts = data; })
        .error(function(data, status, headers, config, statusText) { alert('Error executing http get collection.'); }) ;

});

mainApp.controller('editContactController', function ($scope, $http, $routeParams) {
    $http.get('http://localhost:3000/contact/' + $routeParams._id)
        .success(function(data, status, headers, config, statusText) { alert($routeParams._id + '\n' + data); $scope.contact = data; })
        .error(function(data, status, headers, config, statusText) { alert('Error executing http get document.'); }) ;

    $scope.message = 'Update Contact'

    $scope.saveContact = function() {
        alert('Save is not ready yet.');
    };
});
