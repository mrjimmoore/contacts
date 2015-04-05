app.factory("contactsDataFactory", ["$http", function ($http) {
    var urlBase = "http://localhost:3000/contacts";
    var contactsDataFactory = {};

    contactsDataFactory.getContacts = function () {
        return $http.get(urlBase);
    };

    contactsDataFactory.getContactsSorted = function (sortColumn, sortDescending) {
        return $http.get(urlBase + "/" + sortColumn + "/" + (sortDescending ? "descending" : "ascending"));
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