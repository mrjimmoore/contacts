// module

var app = angular.module('myApp', ['ngRoute']);

// routes

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'home.html', controller: 'homeController' })
        .when('/about', { templateUrl: 'about.html', controller: 'aboutController' })
        .when('/help', { templateUrl: 'help.html', controller: 'helpController' })
        .when('/addContact', { templateUrl: 'contact.html', controller: 'addContactController' })
        .when('/listContacts', { templateUrl: 'contacts.html', controller: 'listContactsController' })
        .when('/editContact/:_id', { templateUrl: 'contact.html', controller: 'editContactController' })
        .otherwise({ templateUrl: 'home.html', controller: 'homeController' });
});

// controllers

app.controller('mainController', function ($scope) {
    $scope.bannerTitle = 'SPA Example';
    $scope.bannerSubTitle = 'using HTML5, AngularJS, Node.js, and MongoDB';
    $scope.pageTitle = 'Contacts';
    $scope.pageMessage = 'Lorem ipsum potenti odio imperdiet tempor pulvinar metus, per imperdiet nulla mauris pharetra elementum orci, erat lectus bibendum et himenaeos platea interdum turpis elementum nibh interdum rutrum sagittis congue dolor blandit, condimentum mattis imperdiet mi nulla habitasse pellentesque aliquam, sociosqu magna ultricies nam quis phasellus fusce ultrices.';
    $scope.currentDate = new Date();
});

app.controller('homeController', function ($scope) {
    $scope.message = 'Home page message...';
});

app.controller('aboutController', function ($scope) {
    $scope.message = 'About page message...';
});

app.controller('helpController', function ($scope) {
    $scope.message = 'Help page message...';
});

app.controller('addContactController', function ($scope) {
    $scope.message = 'Add New Contact'

    $scope.saveContact = function() {
        alert('Save is not ready yet.');
    };
});

app.controller('listContactsController', function ($scope, $http) {
    $http.get('http://localhost:3000/contact')
        .success(function(data, status, headers, config, statusText) { $scope.contacts = data; })
        .error(function(data, status, headers, config, statusText) { alert('Error executing http get collection.'); }) ;
});

app.controller('editContactController', function ($scope, $http, $routeParams) {
    $http.get('http://localhost:3000/contact/' + $routeParams._id)
        .success(function(data, status, headers, config, statusText) { alert(data); $scope.contact = data; })
        .error(function(data, status, headers, config, statusText) { alert('Error executing http get document.'); }) ;

    $scope.message = 'Update Contact'
    
    $scope.saveContact = function() {
        alert('Save is not ready yet.');
    };
});