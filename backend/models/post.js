// creating blueprint (which is just a Schema not model) here

const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: { type:String , required: true },
    organiser:{ type:String, required: true },
    info : { type:String, required: true },
    date : {type: Date, required:true},
    content : {type:String, required:true}
});

module.exports =  mongoose.model('Post',postSchema);