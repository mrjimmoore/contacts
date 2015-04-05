// confirmation dialog with custom message
app.directive("jimConfirmClick", function () {
    return {
        priority: -1,
        restrict: "A",
        link: function (scope, element, attributes) {
            element.bind("click", function (event) {
                var message = attributes.jimConfirmClick;
                if (!confirm(message)) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                }
            });
        }
    }
});