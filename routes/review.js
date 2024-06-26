const express=require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//Review add Route
router.post("/", validateReview, wrapAsync(async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    // console.log(newReview);
    // console.log(listing);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    console.log("new review saved successfully");
    // console.log(listing);
    res.redirect(`/listings/${listing._id}`);
}));

//Review delete route
router.delete("/:reviewId", wrapAsync(async (req,res) => {
    let {id, reviewId} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    let review = await Review.findByIdAndDelete(reviewId);
    // await listing.save();
    res.redirect(`/listings/${id}`);
}));

module.exports = router;