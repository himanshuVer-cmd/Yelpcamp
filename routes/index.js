var express		=	require("express"),
	router		=	express.Router(),
	passport	=	require("passport"),
	User 		=	require("../models/user.js");


router.get("/", function (req,res){
	res.render("landing");
});

//AUTH ROUTES
router.get("/register" , (req , res) =>{
	res.render("register");
});

router.post("/register" , (req,res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser , req.body.password ,function(err, user){
		if(err){
			req.flash("error" , err.message);
			console.log("err");
			return res.render("register");
		}
		passport.authenticate("local")(req ,res,function(){
			req.flash("success" ,"Welcome to Yelpcamp "+newUser.username+"!");
			res.redirect("/campgrounds");
		});
	});
});

// Login Form
router.get("/login" , (req,res) =>{
	res.render("login");
});

router.post("/login" , passport.authenticate("local" ,{successRedirect : "/campgrounds" , failureRedirect : "/login"}),(req,res) =>{
});

//LOGOUT Route
router.get("/logout" , (req,res)=>{
	req.logout();
	req.flash("success" , "Logged you out");
	res.redirect("/campgrounds");
});

module.exports	= router;
