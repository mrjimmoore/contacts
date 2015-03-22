// module

var app = angular.module("mainApp", ["ngRoute"]);

// routes

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {templateUrl: "home.html", controller: "homeController"})
        .when("/about", {templateUrl: "about.html", controller: "aboutController"})
        .when("/help", {templateUrl: "help.html", controller: "helpController"})
        .when("/settings", {templateUrl: "settings.html", controller: "settingsController"})
        .when("/addContact", {templateUrl: "contact.html", controller: "contactDetailController"})
        .when("/listContacts", {templateUrl: "contacts.html", controller: "contactListController"})
        .when("/updateContact/:_id", {templateUrl: "contact.html", controller: "contactDetailController"})
        .otherwise({templateUrl: "home.html", controller: "homeController"});

    $locationProvider.html5Mode(true).hashPrefix("!");
});

// factory

app.factory("dataFactory", ["$http", function ($http) {
    var urlBase = "http://localhost:3000/contacts";
    var dataFactory = {};

    dataFactory.getContacts = function () {
        return $http.get(urlBase);
    };

    dataFactory.getContactsSorted = function (sortColumn, sortDescending) {
        return $http.get(urlBase + "/" + sortColumn + "/" + (sortDescending ? "descending" : "ascending"));
    };

    dataFactory.getContact = function (id) {
        return $http.get(urlBase + "/" + id);
    };

    dataFactory.insertContact = function (contact) {
        return $http.post(urlBase, contact);
    };

    dataFactory.updateContact = function (contact) {
        return $http.put(urlBase + "/" + contact._id, contact)
    };

    dataFactory.deleteContact = function (id) {
        return $http.delete(urlBase + "/" + id);
    };

    return dataFactory;
}]);

// controllers

app.controller("mainController", function ($scope, $location) {
    $("#headerContent").load("mainHeader.html");
    $scope.navbarTitle = "SPA Example";
    $scope.navbarSubTitle = "using the MEAN Stack";
    $scope.copyrightDate = new Date();

    // Allow the routeProvider to be loaded via ng-click.
    $scope.loadView = function (uri) {
        $location.path(uri);
    }
});

app.controller("homeController", function ($scope) {
    $("#headerContent").load("mainHeader.html");
    $scope.articleTitle = "Home";
});

app.controller("aboutController", function ($scope) {
    $("#headerContent").load("mainHeader.html");
    $scope.articleTitle = "About";
});

app.controller("helpController", function ($scope) {
    $("#headerContent").load("mainHeader.html");
    $scope.articleTitle = "Help";
});

app.controller("settingsController", function ($scope) {
    $("#headerContent").load("mainHeader.html");
    $scope.articleTitle = "Settings";
});

app.controller("contactListController", function ($scope, $window, dataFactory) {
    $("#headerContent").load("contactsHeader.html");
    $scope.sortColumn = "fullname";
    $scope.sortDescending = false;
    getContacts();

    function getContacts() {
        dataFactory.getContactsSorted($scope.sortColumn, $scope.sortDescending)
            .success(function (docs) {
                $scope.contacts = docs;
            })
            .error(function (err) {
                alert("Unable to load data: " + err.message);
            });
    }

    $scope.deleteContact = function (index) {
        dataFactory.deleteContact($scope.contacts[index]._id)
            .success(function () {
                getContacts();
            })
            .error(function (err) {
                alert("Unable to delete document: " + err.message);
            });
    };

    $scope.changeSorting = function (columnName) {
        if (columnName == $scope.sortColumn) {
            $scope.sortDescending = !$scope.sortDescending;
        } else {
            $scope.sortColumn = columnName;
            $scope.sortDescending = false;
        }
        getContacts();
    }
});

app.controller("contactDetailController", function ($scope, $routeParams, dataFactory) {
    if ($routeParams._id == null) {
        $scope.sectionTitle = "Add Contact";
    } else {
        $scope.sectionTitle = "Update Contact";
        getContact($routeParams._id);
    }

    $scope.saveContact = function () {
        if ($scope.contact._id == null) {
            addContact($scope.contact);
        } else {
            updateContact($scope.contact);
        }
    };

    function getContact(id) {
        dataFactory.getContact(id)
            .success(function (doc) {
                $scope.contact = doc;
            })
            .error(function (err) {
                alert("Unable to get document: " + err.message);
            });
    }

    function addContact(contact) {
        dataFactory.insertContact(contact)
            .success(function (doc) {
                $scope.contact = doc;
                $scope.sectionTitle = "Update Contact";
            })
            .error(function (err) {
                alert("Unable to add a contact: " + err.message);
            });
    }

    function updateContact(contact) {
        dataFactory.updateContact(contact)
            .success(function (doc) {
                $scope.contact = doc;
            })
            .error(function (err) {
                alert("Unable to update contact: " + err.message);
            })
    }
});

// Directives

app.directive("jimConfirmClick", [
    function () {
        return {
            priority: -1,
            restrict: "A",
            link: function (scope, element, attrs) {
                element.bind("click", function (e) {
                    var message = attrs.jimConfirmClick;
                    if (message && !confirm(message)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        }
    }
]);

app.directive("focus", function () {
    return {
        link: function (scope, element, attrs) {
            element[0].focus();
        }
    };
});
