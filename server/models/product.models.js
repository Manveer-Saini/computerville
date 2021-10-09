const mongoose = require("mongoose");
// const User = require("./user.models");


// Validation for Color field.
// COLORS = ['red', 'green', 'blue', 'orange', 'yellow'];

// function colorValidator (v) {
//     if (v.indexOf('#') == 0) {
//         if (v.length == 7) {  // #f0f0f0
//             return true;
//         } else if (v.length == 4) {  // #fff
//             return true;
//         }
//     }
//     return COLORS.indexOf(v) > -1;
// };

// "RockCandyOS 21.04",
//     "RockCandyOS 20.10 LTS",
//     "Ubuntu"

const ProductSchema = new mongoose.Schema({

    color_id: {
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    },
    os_id: {
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    },
    user_id:{
        //in ref to User collection... obj Id gives us everything in that user
        type: mongoose.Schema.Types.ObjectId,

        //needs to match what we called our collection, it is case sensitive.
        //ref is able to grab ANY collection in the db
        ref: "User"
    },
    cpu_id:{
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    },
    gpu_id:{
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    },
    memory_id:{
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    },
    storage_id:{
        
        type: mongoose.Schema.Types.ObjectId,

        ref: "Part"
    }

}, {timestamps:true})
    //timestamps automatically create "createdAt" and"updatedAt" date and time info for each document
    //everytime a doc is updated, it will change the "updatedAt"

//Model is a combination of the 1. collectionName and 2.Schema
//Name will be collection name that's held in the db
//schema is going to be the singular of what will show as plural in the db
    const Product = mongoose.model("Product", ProductSchema);
//This returns a cartoon model with the collection name and that schema

module.exports = Product;