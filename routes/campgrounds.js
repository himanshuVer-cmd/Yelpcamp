var express		=	require("express"),
	router		=	express.Router(),
	Campground	=	require("../models/campgrounds"),
	Comment		=	require("../models/comment"),
	middleware	=	require("../middleware/index.js");
	


router.get("/campgrounds" , function (req , res){
	Campground.find({}, function (err , allCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index" , {campgrounds : allCampground});	
		}
	});
});

router.get("/campgrounds/new" ,middleware.isLoggedIn,function(req , res){
	res.render("campgrounds/new");
});

router.post("/campgrounds" ,middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id : req.user._id ,
		username : req.user.username
	};

	var newCampground = {name:name , image:image , description:desc , author : author , price: price};
	Campground.create(newCampground, function (err , newCampground){
		if(err){
			console.log(err);
		}else {
			res.redirect("/campgrounds");
			console.log("New Campground Created");
		}
	});
});

router.get("/campgrounds/:id" ,function (req,res){
	Campground.findById(req.params.id).populate("comments").exec( function(err , foundCampground){
		if(err){
			console.log(err);
		}else {
			//console.log(foundCampground);
			res.render("campgrounds/show" ,{campground : foundCampground});
		}
	});
});

//Edit Campground Route
router.get("/campgrounds/:id/edit" ,middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id , function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/edit" , {campground : foundCampground});
		}
	});
});

//Show Campground Route
router.put("/campgrounds/:id" , middleware.checkCampgroundOwnership,(req,res) =>{
	Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , campground){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY
router.delete("/campgrounds/:id" ,middleware.checkCampgroundOwnership, (req,res)=>{
	Campground.findByIdAndRemove(req.params.id , (err)=>{
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports	= router;