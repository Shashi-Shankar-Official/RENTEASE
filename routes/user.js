const express= require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/singup", (req,res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req,res) => {
    try {
        let {username, email, password} = req.body;
    const newUser = new User({email,username});

    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success", "Welcome to RentEase");
    res.redirect("/listings");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/singup");
    }
}));

router.get("/login", (req,res) =>{
    res.render("users/signin.ejs");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) ,async (req,res) => {
    try {
        req.flash("success","welcome back to RentEase! You are logged in now!");
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/login");
    }
});

router.get("/logout", (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You have successfully logged out");
        res.redirect("/listings");
    });
    
})

module.exports = router;