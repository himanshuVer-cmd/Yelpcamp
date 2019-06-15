var mongoose 		= 	require("mongoose"),
	Campground		=	require("./models/campgrounds"),
	Comment			=	require("./models/comment");


var data = [
	{
		name:"Rishikesh",
		image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
		description : "Here's some details about this campground!!!"
	},
	{
		name:"Bada Gaon",
		image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-							677064730.jpg",
		description : "Here's some details about this campground!!!"
	},
	{
		name:"Kasol",
		image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
		description : "Here's some details about this campground!!!"
	},
	{
		name:"Panchmarhi",
		image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
		description : "Here's some details about this campground!!!"
	}
];


function seedDB(){
	
	//Remove Campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Database Cleared!!");
		}
	});
	
	 Comment.remove({} , function(err){
		console.log("comment Deleted");
	});
	// Create Campgrounds
	data.forEach( function(seed){
		Campground.create(seed , function(err,campground){
			if(err){
				console.log(err);
			} else{
				console.log("Campground Added");
				Comment.create({
					text:"this is a comment", 
					author:"Himanshu"
					} , function (err,comment){
					if(err){
						console.log(err+"myerr");
					}else {
						//console.log(comment);
						campground.comments.push(comment);
						campground.save();
						console.log("Comment Added!!");
					}
				});
			}
		});
	});
}

module.exports = seedDB;