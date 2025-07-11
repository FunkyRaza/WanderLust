const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const ListingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


// Index and Create Route
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(ListingController.createListing));

// New Form Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// Show, Update, Delete Routes
router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));

// Edit Form Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));

module.exports = router;