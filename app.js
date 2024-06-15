const express = require("express");
const app= express();
const mongoose = require("mongoose");

main().then(()=> {
    console.log("Connected to the database");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

app.get("/", (req,res) => {
    res.send("Hello!!! Welcome Home!");
});

app.listen(8080,()=> {
    console.log("Server is running on port 8080");
});