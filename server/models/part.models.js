const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    // cpu: {
    //     type: String,
    
    //     required: [true, "Part must be specified for the build."],
    //     enum: [
    //         "AMD - Ryzen 5 5600X 4th Gen 6-core",
    //         "AMD - Ryzen 9 5950X 4th Gen 16-core",
    //         "NVIDIA - GEFORCE RTX 3090"
    //     ] 
    // },
    // gpu: {
    //     type: String,
    
    //     required: [true, "Part must be specified for the build."],
    //     enum: [
    //         "AMD - Ryzen 5 5600X 4th Gen 6-core",
    //         "AMD - Ryzen 9 5950X 4th Gen 16-core",
    //         "NVIDIA - GEFORCE RTX 3090"
    //     ] 
    // }
    name: {
        type: String,
    
        required: [true, "Part must be specified for the build."],
    },
    type: {
        type: String,
    
        required: [true, "Part must be specified for the build."],
        enum: [
            "os",
            "color",
            "cpu",
            "gpu",
            "memory",
            "storage"
        ] 
    },
    price: {
        type: Number,
    
        required: [true, "Part must be specified for the build."],
        
    }


}, {timestamps:true})

const Part = mongoose.model("Part", PartSchema);

module.exports = Part;