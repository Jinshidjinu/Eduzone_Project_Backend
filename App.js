
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT || 3000


app.use(cors())













//Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/Eduzone")
.then(()=>{
    
    // Make application listenable 
    app.listen(PORT,()=>{
        console.log(`App Running On ${PORT}`);
    })
})
.catch(()=>{
    console.log("Failed to Connect");
})