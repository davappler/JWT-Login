const router=require("express").Router();
const User=require("../model/User");



// Steps in the video did not work as they were old
// see syntax below how to define the Joi object and how to validate


//Validation 
const Joi = require('@hapi/joi');

const schema =Joi.object({
    name:Joi.string()
        .min(6)
        .required(),
    email:Joi.string()
        .min(6)
        .required()
        .email(),
    password:Joi.string()
        .min(6)
        .required()
});



router.post("/register", async(req,res)=>{
    //Lets validate the inputs before making a new user :)
    const validation=schema.validate(req.body)
    res.send(validation)

    // const newUser=new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // });

    // try{
    //     const savedUser=await newUser.save(); // This line writes into the database
    //     res.send(savedUser);

    // }catch(err)
    // {
    //     res.status(400).send(err)
    // }

});

module.exports=router;