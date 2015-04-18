app.controller("mainController", function ($scope) {
    $scope.copyrightDate = new Date();

    //// alternative to templateUrl by allowing the routeProvider to be loaded via ng-click.
    //// requires $locatoin injection.
    //$scope.loadView = function (uri) {
    //    $location.path(uri);
    //}
});

app.controller("homeController", function ($scope) {
    $("#headerContent").load("header.html");
});

app.controller("aboutController", function ($scope) {
    $("#headerContent").load("header.html");
});

app.controller("helpController", function ($scope) {
    $("#headerContent").load("header.html");
});

app.controller("settingsController", function ($scope) {
    $("#headerContent").load("header.html");
});;