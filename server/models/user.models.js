const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required:[true, "First name is required"]
    },
    lastName:{
        type: String,
        required:[true, "Last name is required"]
    },

    email: {
        type: String,
        required: [true, "Email address is required"]
    },

    address: {
        type: String,
        required: [true, "Address is required"]
    },

    city: {
        type: String,
        required: [true, "City is required"]
    },

    state: {
        type: String,
        required: [true, "State must be supplied"],
        enum: [
            "AK",
            "AL",
            "AR",
            "AS",
            "AZ",
            "CA",
            "CO",
            "CT",
            "DC",
            "DE",
            "FL",
            "GA",
            "GU",
            "HI",
            "IA",
            "ID",
            "IL",
            "IN",
            "KS",
            "KY",
            "LA",
            "MA",
            "MD",
            "ME",
            "MI",
            "MN",
            "MO",
            "MS",
            "MT",
            "NC",
            "ND",
            "NE",
            "NH",
            "NJ",
            "NM",
            "NV",
            "NY",
            "OH",
            "OK",
            "OR",
            "PA",
            "PR",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VA",
            "VI",
            "VT",
            "WA",
            "WI",
            "WV",
            "WY"
        ]
    },
    
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords MUST be at least 8 characters"]
    },

}, {timestamps:true})
    //timestamps automatically create "createdAt" and"updatedAt" date and time info for each document
    //everytime a doc is updated, it will change the "updatedAt"

//Virtual field
    //stores info from our req, but will not be saved to the
    //collection/db (need conf pass, but not storing it)
UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=> this._confirmPassword = value)

//middleware affects/aides in the middle of a process
UserSchema.pre("validate", function(next){
        //no _ because of line 30, we named it
        //similar when we use id instead of _id in
        //req.params
    console.log("in validate");

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
        console.log("didnt match");
    }
    console.log(this.password, this.confirmPassword);
    next();
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
        //encrypt the password BEFORE it's saved to the db
        //Remember, we know they match from middleware above
        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{ 
                //give our password the value of the returned hash
                console.log("in hash");
                this.password = hashedPassword;
            next();
            })
});

//Model is a combination of the 1. collectionName and 2.Schema
//Name will be collection name that's held in the db
//schema is going to be the singular of what will show as plural in the db
const User = mongoose.model("User", UserSchema);
//This returns a user model with the collection name and that schema

module.exports = User;