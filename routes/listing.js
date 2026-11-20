const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index route and create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing),
  );

// new route
// this is just to crate new route to actually create in database we made create route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route , update route and delete route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )

  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// show route
// when u will click on any title the request will go to  /listings/:id // remember the difference the req.body stores the id  from submitted form data . and req.params stores the id from url.

// edit route
// here we created route for editing and rendering our edit form but it is not edited in db now. to actually update in db we create update route.
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
