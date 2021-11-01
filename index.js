const express = require("express")
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");


dotenv.config();


//Import routes
const authRoute=require("./routes/auth") // here we are importing the routes from the auth.js file
const postRoute=require("./routes/posts")

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
()=>console.log("Connected to DB"))

//Middleware
app.use(express.json());


//Route middleware
app.use("/api/user",authRoute) // every end point in the auth.js file will be accessed with a prefix of "/api/user"

app.use("/api/posts",postRoute);

app.listen(3000,()=>console.log("Server is running at 3000"))