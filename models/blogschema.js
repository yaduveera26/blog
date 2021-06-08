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
  }
})

let blog = module.exports = mongoose.model('blogs',blogschema);
