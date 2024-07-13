
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT || 5000
const authRouter = require("./routes/UserRouter")
const TeachersRouter = require('./routes/TeachersRouter')

//middlewares

app.use(cors({
    origin: 'http://localhost:7860',
    credentials: true,
}));
app.use(express.json());


app.use("/api",authRouter)
app.use("/api",TeachersRouter)










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