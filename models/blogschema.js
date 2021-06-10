const mongoose = require('mongoose')

let blogschema = mongoose.Schema({
  text:{
    type:String
  },
  name:{
    type:String
  },
  explanation:{
    type:String
  },
  likes:{
    type:Number
  },
  dislikes:{
    type:Number
  }
})

let blog = module.exports = mongoose.model('blogs',blogschema);
