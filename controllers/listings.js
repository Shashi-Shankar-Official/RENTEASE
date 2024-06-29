const Listing = require("../models/listing.js");

module.exports.index = async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
};

module.exports.renderNewForm = (req,res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews", populate: {
        path: "author"
    }})
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing  = async (req,res,next) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

}

module.exports.renderEditForm = async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", {listing});
}

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}