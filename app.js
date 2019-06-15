var express			= 	require("express");
var app 			=	express();
var bodyParser 		=	require("body-parser");
var mongoose 		=	require("mongoose");
var passport 		=	require("passport");
var LocalStrategy	=	require("passport-local");
var Campground		=	require("./models/campgrounds");
var Comment			=	require("./models/comment");
var User			=	require("./models/user");
var seedDB			=	require("./seeds");
var methodOverride	=	require("method-override");
var flash			=	require("connect-flash");

var commentRoutes	=	require("./routes/comments"),
	indexRoutes		=	require("./routes/index"),
	campgroundRoutes=	require("./routes/campgrounds");

mongoose.connect("mongodb+srv://Himanshu:Dr.vsec11@cluster0-g7lrm.mongodb.net/test?retryWrites=true" , {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() =>{
	console.log("Connected to DB!!");
}).catch(err => {
	console.log('ERROR:',err.message);
});

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" ,"ejs" );
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.set("useFindAndModify" , false);
app.use(flash());
//seedDB();

//PASSPORT CONFIG ===============
app.use(require("express-session")({
	secret				:	"This is a secret",
	resave				:	false ,
	saveUninitialized	:	false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser 	= req.user;
	res.locals.error		= req.flash("error");
	res.locals.success		= req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(2000 , () => console.log("Yelpcamp Server Initiated!!"));