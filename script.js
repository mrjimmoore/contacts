// module

var app = angular.module("myApps", ["ngRoute"]);

// routes

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {templateUrl: "home.html", controller: "homeController"})
        .when("/about", {templateUrl: "about.html", controller: "aboutController"})
        .when("/help", {templateUrl: "help.html", controller: "helpController"})
        .when("/settings", {templateUrl: "settings/settings.html", controller: "settingsController"})
        .when("/contacts", {templateUrl: "contacts/contacts.html", controller: "contactsController"})
        .when("/contacts/contact", {templateUrl: "contacts/contact.html", controller: "contactController"})
        .when("/contacts/contact/:_id", {templateUrl: "contacts/contact.html", controller: "contactController"})
        .otherwise({templateUrl: "home.html", controller: "homeController"});

    $locationProvider.html5Mode(true).hashPrefix("!");
});