const router=require("express").Router();
const User=require("../model/User");




router.post("/register", async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    try{
        const savedUser=await newUser.save(); // This line writes into the database
        res.send(savedUser);

    }catch(err)
    {
        res.status(400).send(err)
    }

});

module.exports=router;