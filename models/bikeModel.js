const mongoose = require("mongoose");
const Joi = require("joi");

const jwt = require("jsonwebtoken");
const { privateKey } = require("../key");


const bikeSchema = new mongoose.Schema({
    company:{
        type:String,
        unique:true
    },
    model:String,
    year:Number,
    price:Number,
},
{timestamps:true}
);

exports.BikeModel = mongoose.model("bikes", bikeSchema);

exports.createToken = (user_id) => {
    const token = jwt.sign({_id:user_id},privateKey, {expiresIn:"600mins"});
    return token;
}

exports.validateBike = (_reqBody) => {
    const joiSchema = Joi.object({
        company: Joi.string().min(2).max(70).required(),
        model: Joi.string().min(2).max(70).required(),
        year: Joi.number().min(1950).max(2023).required(),
        price: Joi.number().min(150).max(20000).required(),
      });
      return joiSchema.validate(_reqBody);
}