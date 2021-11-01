const router=require("express").Router();

//If we wanna  make this route as private route then we will use verifyToken here
const verify = require("./verifyToken")


// if the provided token in the header is valid then we will be able to access private routes
// with the help of te function verify we will verify if the token us valid and then we will access the user

router.get("/",verify,(req,res)=>{
    // res.json({posts:{title:"My first post",description:"Random data"}})
    res.send(req.user) // this will send the information of the logged in user
})




module.exports=router; 