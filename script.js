// module

var mainApp = angular.module('mainApp', ['ngRoute']);

// routes

mainApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {templateUrl: 'home.html', controller: 'homeController'})
        .when('/about', {templateUrl: 'about.html', controller: 'aboutController'})
        .when('/help', {templateUrl: 'help.html', controller: 'helpController'})
        .when('/addContact', {templateUrl: 'contact.html', controller: 'addContactController'})
        .when('/listContacts', {templateUrl: 'contacts.html', controller: 'listContactsController'})
        .when('/editContact/:_id', {templateUrl: 'contact.html', controller: 'editContactController'})
        .otherwise({templateUrl: 'home.html', controller: 'homeController'});

    $locationProvider.html5Mode(true).hashPrefix('!')
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

mainApp.controller('listContactsController', function ($scope, $http, $location) {
    getContacts($scope, $http);

    $scope.deleteContact = function (index) {
        deleteContact($http, $scope.contacts[index]._id)
    };
});

mainApp.controller('addContactController', function ($scope, $http, $routeParams) {
    $scope.message = 'Add New Contact';

    $scope.saveContact = function () {
        if ($scope.contact._id == null) {
            addContact($scope, $http);
        } else {
            updateContact($http, $scope.contacts[index]._id);
        }
    };
});

mainApp.controller('editContactController', function ($scope, $http, $routeParams) {
    getContactById($scope, $http, $routeParams);
    $scope.message = 'Update Contact';

    $scope.saveContact = function () {
        updateContact($http, $routeParams._id);
    };
});

function getContacts(scope, http) {
    http.get('http://localhost:3000/contacts')
        .success(function (data, status, headers, config, statusText) {
            scope.contacts = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get collection.' + statusText);
        });
}

function getContactById(scope, http, routeParams) {
    http.get('http://localhost:3000/contacts/' + routeParams._id)
        .success(function (data, status, headers, config, statusText) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get document.');
        });
}

function addContact(scope, http) {
    http.post('http://localhost:3000/contacts', JSON.stringify(scope.contact))
        .success(function (data, status, headers, config) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config) {
            alert('Error executing http get document.');
        });
}

function updateContact(scope, http, routeParams) {
    http.put('http://localhost:3000/contacts/' + routeParams._id)
        .success(function (data, status, headers, config, statusText) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get document.');
        });
}

function deleteContact(http, _id) {
    http.delete('http://localhost:3000/contacts/' + _id)
        .success(function (data, status, headers, config, statusText) {
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http delete document.');
        });
}