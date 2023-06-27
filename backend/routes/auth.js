const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ayushisagoodboy";  
var fetchuser = require("../middleware/fetchuser");

//ROUTE 1: a user using: POST "/api/auth/createuser". No login required
//As it is for particular router so use router instead of app
router.post('/createuser',[
 body('name','Enter a valid name').isLength({min: 3}),
  body('email','Enter valid Email').isEmail(),
  body('password','Password must be atleast 5 characters').isLength({min: 5}),
],async (req,res)=>{
//If there are errors , return bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    success = false;
    return res.status(400).json({success,errors: errors.array()});
  }
  //check whether the user with this email exists already
  try {
  let user = await User.findOne({email: req.body.email});
  if(user){
    success = false;
    return res.status(400).json({success,error: "Sorry a user with this email already exists"})
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password,salt);

  //create a new user
  user = await User.create({
    name: req.body.name,
    password: secPass,
    email:req.body.email,
  });
  // .then(user => res.json(user))
  // .catch(err => {console.log(err)
  // res.json({error: 'Please enter a Unique value'})})

  const data = {
    user:{
      id: user.id
    }
  }
const authtoken = jwt.sign(data,JWT_SECRET);
success = true;
  res.json({success,authtoken})
  // res.send(req.body);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server error");
}
})

//ROUTE 2:Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
  body('email','Enter valid Email').isEmail(),
  body('password','password cannot be blank').exists(),
],async (req,res)=>{
  //If there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({success,errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({success,error: "please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({success, error: "please try to login with correct credentials" });
    }
    //otherwise send user data
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send(success,"Internal Server error");
  }

});
  // ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
  router.post("/getuser", fetchuser, async (req, res) => {
    try {
   let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;