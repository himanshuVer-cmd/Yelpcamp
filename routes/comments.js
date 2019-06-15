var express		=	require("express"),
	router		=	express.Router(),
	Campground	=	require("../models/campgrounds"),
	Comment		=	require("../models/comment"),
	middleware	=	require("../middleware/index.js");

//COMMENT ROUTE
router.get("/campgrounds/:id/comments/new" ,middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id , function (err,campground){
		if(err){
			console.log("Error");
		} else{
				res.render("comment/new", {campground: campground});
		}
	});
	});

router.post("/campgrounds/:id/comments" ,middleware.isLoggedIn, (req ,res) =>{
	Campground.findById(req.params.id , function(err , campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment , (err , comment) =>{
				if(err){
					req.flash("error" , "Something went wrong!!");
					console.log(err);
				} else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//console.log(req.user.username);
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success" , "Successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit" , middleware.checkCommentOwnership , (req,res) =>{	
		Comment.findById(req.params.comment_id , function(err , foundComment){
					 if(err){
						 res.redirect("back");
					 } else {
						res.render("comment/edit" , {campground_id : req.params.id , comment : foundComment});	 
					 }
					 });
	});
	


router.put("/campgrounds/:id/comments/:comment_id"  , middleware.checkCommentOwnership ,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , function(err ,foundComment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success" , "Comment edited");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//DESTROY
router.delete("/campgrounds/:id/comments/:comment_id" ,middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id , (err)=>{
		if(err){
			res.redirect();
		} else{
			req.flash("success" ,"Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


module.exports	= router;