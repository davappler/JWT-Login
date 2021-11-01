const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");

dotenv.config();

module.exports=function(req,res,next)
{
    const token= req.header("auth-token")
    console.log("------------")
    console.log(token)
    console.log("------------")

    if(!token)
        return  res.status(401).send("Access dneied")
    
    try{
        const verified =jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verified;
        next();
    }catch(err){
        console.log(err)
        res.status(400).send("Invalid token")
    }    

}