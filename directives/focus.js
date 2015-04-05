// sets initial focus on page load
app.directive("focus", function () {
    return {
        restrict: "A",
        link: function (scope, element, attributes) {
            element[0].focus();
        }
    };
});