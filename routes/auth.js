const router=require("express").Router();
const user=require("../model/user");
const {registerValidation,loginValidation}=require("../validation")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



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

// Hashing the password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(req.body.password,salt)

// Creating a new user
    const newUser=new user({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try{
        const savedUser=await newUser.save(); // This line writes into the database
        res.send(savedUser);

    }catch(err)
    {
        res.status(400).send(err)
    }

});



//Login
router.post("/login",async(req,res)=>{

    const validation=loginValidation(req.body) 
    if(validation.error){
        return res.status(400).send(validation.error.message)
    }

// Checking if the user is already in the database.
    const userExist=await user.findOne({email:req.body.email});

    if(!userExist)
        return res.status(400).send("Email  is incorrect")
    

//Password is correct
    const validPass=await bcrypt.compare(req.body.password,userExist.password)
    if(!validPass)
        return res.status(400).send("password is incorrect")

//Create and assign a token
    const token=jwt.sign({_id:userExist._id},process.env.TOKEN_SECRET)
    
    res.header("auth-token",token).send(token)

    
})

module.exports=router;