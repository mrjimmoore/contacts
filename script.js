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
        .when("/contacts/contact", {templateUrl: "contacts/default.html", controller: "contactController"})
        .when("/contacts/contact/:_id", {templateUrl: "contacts/default.html", controller: "contactController"})
        .when("/calendar", {templateUrl: "calendar/default.html", controller: "calendarController"})
        .when("/documentsxxxxxxx", {templateUrl: "documentsxxxxxxx/default.html", controller: "documentsController"})
        .when("/training", {templateUrl: "training/default.html", controller: "trainingController"})
        .when("/support", {templateUrl: "support/default.html", controller: "supportController"})
        .when("/feedback", {templateUrl: "feedback/default.html", controller: "feedbackController"})
        .when("/survey", {templateUrl: "survey/default.html", controller: "surveyController"})
        .otherwise({templateUrl: "home.html", controller: "homeController"});

    $locationProvider.html5Mode(true).hashPrefix("!");
});