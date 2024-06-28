const express=require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn} = require("../middleware.js");

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
} 

//Index route
router.get("/", wrapAsync(async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
}));

//New route
router.get("/new",isLoggedIn , (req,res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
});

//Show route
router.get("/:id", wrapAsync(async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));

//Create route
router.post("/",isLoggedIn , validateListing, wrapAsync(async (req,res,next) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

}));

//edit route
router.get("/:id/edit",isLoggedIn , wrapAsync(async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", {listing});
}));

//Update route
router.put("/:id",isLoggedIn , validateListing, wrapAsync(async (req,res) => {
    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id",isLoggedIn , wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;