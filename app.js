const express = require("express");
const app= express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-Override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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






app.use("/listings", listings);

app.use("/listings/:id/reviews",reviews);




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