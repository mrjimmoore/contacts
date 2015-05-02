app.controller("contactsController", function ($scope, $window, contactsDataFactory) {
    $("#headerContent").load("contacts/header.html");
    $scope.sortColumn = "fullname";
    $scope.sortDescending = false;
    getContacts();

    function getContacts() {
        contactsDataFactory.getContactsSorted($scope.searchCriteria, $scope.sortColumn, $scope.sortDescending)
            .success(function (docs) {
                $scope.contacts = docs;
            })
            .error(function (err) {
                alert("Unable to load data: " + err.message);
            });
    }

    $scope.findContacts = function () {
        getContacts();
    }

    $scope.deleteContact = function (index) {
        contactsDataFactory.deleteContact($scope.contacts[index]._id)
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

app.controller("contactController", function ($scope, $routeParams, contactsDataFactory) {
    if ($routeParams._id == null) {
        $scope.sectionTitle = "Add New Contact";
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
        contactsDataFactory.getContact(id)
            .success(function (doc) {
                $scope.contact = doc;
            })
            .error(function (err) {
                alert("Unable to get document: " + err.message);
            });
    }

    function addContact(contact) {
        contactsDataFactory.insertContact(contact)
            .success(function (doc) {
                $scope.contact = doc;
                $scope.sectionTitle = "Update Contact";
            })
            .error(function (err) {
                alert("Unable to add a contact: " + err.message);
            });
    }

    function updateContact(contact) {
        contactsDataFactory.updateContact(contact)
            .success(function (doc) {
                $scope.contact = doc;
            })
            .error(function (err) {
                alert("Unable to update contact: " + err.message);
            });
    }
});