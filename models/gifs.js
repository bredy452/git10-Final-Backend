const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const gifSchema = new Schema({
name: {type: String, required: true},
url: {type: String, required: true},
description: String,
gifId: String,
numberOfLikes: Number
});

module.exports = model('Gif', gifSchema)