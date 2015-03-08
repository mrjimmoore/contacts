// module

var app = angular.module('mainApp', ['ngRoute']);

// routes

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {templateUrl: 'home.html', controller: 'homeController'})
        .when('/about', {templateUrl: 'about.html', controller: 'aboutController'})
        .when('/help', {templateUrl: 'help.html', controller: 'helpController'})
        .when('/addContact', {templateUrl: 'contact.html', controller: 'contactDetailController'})
        .when('/listContacts', {templateUrl: 'contacts.html', controller: 'contactListController'})
        .when('/updateContact/:_id', {templateUrl: 'contact.html', controller: 'contactDetailController'})
        .otherwise({templateUrl: 'home.html', controller: 'homeController'});

    $locationProvider.html5Mode(true).hashPrefix('!')
});

// controllers

app.controller('mainController', function ($scope) {
    $scope.bannerTitle = 'SPA Example';
    $scope.bannerSubTitle = 'using HTML5, AngularJS, Node.js, and MongoDB';
    $scope.pageTitle = 'Contacts';
    $scope.pageMessage = 'Morbi ullamcorper auctor convallis quam turpis molestie eget sem, leo cras velit lacus vulputate imperdiet molestie, gravida suscipit facilisis sagittis per fusce ante.';
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

app.controller('contactListController', function ($scope, $http) {
    getContacts($scope, $http);

    $scope.deleteContact = function (index) {
        deleteContact($scope, $http, index);
    };
});

app.controller('contactDetailController', function ($scope, $http, $routeParams) {
    if ($routeParams._id == null) {
        $scope.message = 'Add New Contact';
    } else {
        $scope.message = 'Update Contact';
        getContactById($scope, $http, $routeParams);
    }

    $scope.saveContact = function () {
        if ($routeParams._id == null) {
            addContact($scope, $http);
        } else {
            updateContact($scope, $http, $routeParams,$scope.contact);
        }
    };
});

function getContacts(scope, http) {
    http.get('http://localhost:3000/contacts')
        .success(function (data) {
            scope.contacts = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get collection.');
        });
}

function getContactById(scope, http, routeParams) {
    http.get('http://localhost:3000/contacts/' + routeParams._id)
        .success(function (data) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get document.');
        });
}

function addContact(scope, http) {
    http.post('http://localhost:3000/contacts', scope.contact)
        .success(function (data) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config) {
            alert('Error executing http get document.');
        });
}

function updateContact(scope, http, routeParams, contact) {
    JSON.stringify(scope.contact)
    http.put('http://localhost:3000/contacts/' + routeParams._id, scope.contact)
        .success(function (data) {
            scope.contact = data;
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http get document.');
        });
}

function deleteContact(scope, http, index) {
    http.delete('http://localhost:3000/contacts/' + scope.contacts[index]._id)
        .success(function (data, status, headers, config, statusText) {
            getContacts(scope, http);
        })
        .error(function (data, status, headers, config, statusText) {
            alert('Error executing http delete document.');
        });
}