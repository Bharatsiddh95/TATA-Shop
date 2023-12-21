var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localstrategy = require("passport-local");


passport.use(new localstrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get("/profile",isLoggenId, function(req,res){
  res.render("profile")
});

router.post("/register", function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    name:req.body.name

  })
  userModel.register(userdata,req.body.password)
  .then(function(registeruser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })

})


router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
})  ,function(req,res){
})




router.get("/logout",function(req,res,next){
  req.logout((err)=>{
    if(err){ return next(err) }
    res.redirect("/")
  })
});



function isLoggenId(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')

}

module.exports = router;
