const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const app = express()
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

mongoose.connect('mongodb+srv://yadu:1234@cluster0.0kdvi.mongodb.net/blog?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
const Blog = require('./models/blogschema')

db.once('open',(err)=>{
  if(err)
  console.log(err);
  else {
    console.log('db connected');
  }
})

db.on('error',(err)=>{
  if(err)
  console.log(err);
})

app.get('/',(req,res)=>{
  Blog.find({},(err,blogs)=>{
    if(err)
    console.log(err);
    else {
      // console.log(blogs);
      res.render('home',{blogs:blogs})
    }
  })
})

app.get('/writeblog',(req,res)=>{
  res.render('writeblog')
})

app.post('/writeblog',(req,res)=>{
  let text = req.body.text;
  let name = req.body.name;
  let explanation = req.body.explanation;
  if(!text || !name || !explanation)
  console.log('please fill all fields');
  else {
    let newBlog = new Blog();
    newBlog.name = name;
    newBlog.text = text;
    newBlog.explanation = explanation;
    newBlog.likes = 0;
    newBlog.dislikes = 0;
    newBlog.save((err)=>{
      if(err)
      console.log(err);
      else {
        console.log('successfully submitted,thanks for your contribution');
        res.redirect('/');
      }
    });
  }
})

app.get('/like/:id',(req,res)=>{
  Blog.findOne({_id:req.params.id},(err,blog)=>{
    blog.likes+=1;
    blog.save(err=>{
      if(err)
      console.log(err);
      else {
        res.send('hello world')
      }
    })
  })
})

app.get('/dislike/:id',(req,res)=>{
  Blog.findOne({_id:req.params.id},(err,blog)=>{
    blog.dislikes+=1;
    blog.save(err=>{
      if(err)
      console.log(err);
      else {
        res.send('hello world')
      }
    })
  })
})

const port = process.env.PORT || 3000
app.listen(port,(err)=>{
  if(err)
  console.log(err);
  else {
    console.log(`listening at ${port}`);
  }
})
