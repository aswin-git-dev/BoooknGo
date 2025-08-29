const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



const bookingSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone : String,
    city : String,
    date : String,
    hotel : String,
    createdAt : { type : Date , default : Date.now}

});


const book = mongoose.model("Book",bookingSchema);

app.post("/api/bookings", async(req,res) => {
    try{
        const newPerson = new book(req.body);
        await newPerson.save();
        res.status(201).json({message: "Booking Saved"});
     } catch(err){
            res.status(500).json({message : "Error",err});
         }
    
});

app.listen(5000,()=>{
    console.log("Server running on 5000");
});