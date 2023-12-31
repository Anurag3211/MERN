const jwt=require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the server`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill in all fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }else if(password != cpassword){
      return res.status(422).json({error:"password are not matching"});
    }else{

      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();
  
      res.status(201).json({message: "user registered successfully"});
    
    }

}catch(err){
    console.log(err);
  }


});



//login route

router.post('/signin',async(req,res)=>{
   
    try {
      let token;
      const {email ,password}=req.body;

      if(!email || !password){
        return res.status(400).json({error:"please filled the data"})
      }
      const userLogin=await User.findOne({email:email});

      // console.log(userLogin);

      if (userLogin) {
        const isMatch=await bcrypt.compare(password,userLogin.password);
 token=await userLogin.generateAuthToken();
console.log(token);


res.cookie("jwtoken",token,{
  expires:new Date(Date.now()+25892000000),
  httpOnly:true
});

      if(!isMatch){
        res.status(400).json({error:"Invalid credientials"});
      } else {
        res.json({message:"user Signin Successfully"})
      }

      }else{
        res.json({message:"user signin successfully"});
      }
        
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
