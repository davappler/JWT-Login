const router=require("express").Router();
const user=require("../model/user");
const {registerValidation,loginValidation}=require("../validation")



// Steps in the video did not work as they were old
// see syntax below how to define the Joi object and how to validate






router.post("/register", async(req,res)=>{
    //Lets validate the inputs before making a new user :)
    const validation=registerValidation(req.body) 

    if(validation.error){
        return res.status(400).send(validation.error.message)
    }

// Checking if the user is already in the database.
    const emailExist=await user.findOne({email:req.body.email});

    if(emailExist)
    {
        return res.status(400).send("Email already exist")
    }

// Creating a new user
    const newUser=new user({
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