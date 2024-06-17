const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-Override");
const ejsMate = require("ejs-mate");

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
    res.send("Hello!!! Welcome Home!");
});

//Index route
app.get("/listings", async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
});

//New route

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//Create route
app.post("/listings", async (req,res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
});

//Update route
app.put("/listings/:id", async (req,res) => {
    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
});

//Delete route
app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

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

app.listen(8080,()=> {
    console.log("Server is running on port 8080");
});