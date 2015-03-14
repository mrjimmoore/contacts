// Run this from within Mongo to create and load setup collections

use myContacts

db.createCollection("configuration")

db.configuration.insert({
    bannerTitle: "SPA Example",
    bannerSubTitle: "using the MEAN Stack",
    headerTitle: "Contacts",
    headerMessage: "Morbi ullamcorper auctor convallis quam turpis molestie eget sem, leo cras velit lacus vulputate imperdiet molestie, gravida suscipit facilisis sagittis per fusce ante."
})