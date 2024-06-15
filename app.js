const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

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

app.get("/", (req,res) => {
    res.send("Hello!!! Welcome Home!");
});

//Index route
app.get("/listings", async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
});

//Show route
app.get("/listings/:id", async (req,res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//New route

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

//Create route

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