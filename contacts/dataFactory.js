app.factory("contactsDataFactory", ["$http", function ($http) {
    var urlBase = "http://localhost:3000/contacts";
    var contactsDataFactory = {};

    contactsDataFactory.getContacts = function () {
        return $http.get(urlBase);
    };

    contactsDataFactory.getContactsSorted = function (searchCriteria, sortColumn, sortDescending) {
        //return $http.get(urlBase + "/" + searchCriteria + "/" + sortColumn + "/" + (sortDescending ? "descending" : "ascending"));
        return $http.get(urlBase, {
            params: {
                "searchCriteria": searchCriteria,
                "sortColumn": sortColumn,
                "sortDirection": (sortDescending ? "descending" : "ascending")
            }
        });
    };

    contactsDataFactory.getContact = function (id) {
        return $http.get(urlBase + "/" + id);
    };

    contactsDataFactory.insertContact = function (contact) {
        return $http.post(urlBase, contact);
    };

    contactsDataFactory.updateContact = function (contact) {
        return $http.put(urlBase + "/" + contact._id, contact)
    };

    contactsDataFactory.deleteContact = function (id) {
        return $http.delete(urlBase + "/" + id);
    };

    return contactsDataFactory;
}]);