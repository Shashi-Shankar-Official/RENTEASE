const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-Override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");

main().then(()=> {
    console.log("Connected to the database");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req,res) => {
    res.render("listings/home.ejs");
});

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
app.get("/listings", wrapAsync(async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
}));

//New route

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", wrapAsync(async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}));

//Create route
app.post("/listings", validateListing, wrapAsync(async (req,res,next) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");

}));

//edit route
app.get("/listings/:id/edit", wrapAsync(async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
}));

//Update route
app.put("/listings/:id", validateListing, wrapAsync(async (req,res) => {
    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
}));

//Delete route
app.delete("/listings/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//Review add Route
app.post("/listings/:id/reviews", async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    console.log(newReview);
    console.log(listing);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    console.log("new review saved successfully");
    console.log(listing);
    res.redirect(`/listings/${listing._id}`);
});

// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My home",
//         description:"By the beach",
//         price: 1200,
//         locaton: "calaunga, Goa",
//         country: "India",
//     })

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesful!");
// })

app.all("*", (req,res,next) => {
    next(new ExpressError(404,"Page not found"));
})

app.use((err,req,res,next) =>{
    let {statusCode=500,message="something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err});
})

app.listen(8080,()=> {
    console.log("Server is running on port 8080");
});