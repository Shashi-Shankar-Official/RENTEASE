const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    // console.log(newReview);
    // console.log(listing);
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    console.log("new review saved successfully");
    // console.log(listing);
    req.flash("success", "New review Created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req,res) => {
    let {id, reviewId} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    let review = await Review.findByIdAndDelete(reviewId);
    // await listing.save();
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}