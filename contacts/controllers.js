app.controller("contactsController", function ($scope, $window, contactsDataFactory) {
    $("#headerContent").load("contacts/header.html");
    $scope.sortColumn = "fullname";
    $scope.sortDescending = false;
    $scope.currentPage = 1;
    $scope.rowsPerPage = 3;
    pagesToSkip = 0;
    getContacts();

    function getContacts() {
        contactsDataFactory.getContactsByPageAndSorted(
            $scope.searchCriteria,
            $scope.sortColumn,
            $scope.sortDescending,
            pagesToSkip,
            $scope.rowsPerPage)
            .success(function (results) {
                $scope.contacts = results.docs;
                $scope.totalPages = Math.ceil(results.docCount / $scope.rowsPerPage);
                $scope.currentPage = pagesToSkip == -1 ? $scope.totalPages : pagesToSkip + 1;
            })
            .error(function (err) {
                alert("Unable to load data: " + err.message);
            });
    }

    $scope.searchContacts = function () {
        pagesToSkip = 0;

        // Clear searchCriteria if there is no fullname provided
        if ($scope.searchCriteria.fullname == "" || $scope.searchCriteria.fullname == null) {
            $scope.searchCriteria = null;
        }
        getContacts();
    }

    $scope.getPage = function (pageOption) {
        switch (pageOption) {
            case 0:  // get the first page
                pagesToSkip = 0;
                break;
            case 1:  // get previous page
                pagesToSkip = $scope.currentPage < 2 ? 0 : $scope.currentPage - 2;
                break;
            case 2:  // get next page
                pagesToSkip = $scope.currentPage < $scope.totalPages ? $scope.currentPage : $scope.totalPages - 1;
                break;
            case 3:  // get last page
                pagesToSkip = $scope.totalPages - 1;
                break;
            default:  // default to get the first page (should use 0)
                pagesToSkip = 0;
                break;
        }

        // make sure we don't have a negative pagesToSkip
        pagesToSkip = pagesToSkip < 0 ? 0 : pagesToSkip;
        getContacts();
    }

    $scope.changeSorting = function (columnName) {
        pagesToSkip = 0;
        if (columnName == $scope.sortColumn) {
            $scope.sortDescending = !$scope.sortDescending;
        } else {
            $scope.sortColumn = columnName;
            $scope.sortDescending = false;
        }
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