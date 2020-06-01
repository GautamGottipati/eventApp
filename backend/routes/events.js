var express = require('express');
var router = express.Router();

var Post = require('../models/post')



/* GET home page. */
router.get('/api/posts', function(req, res, next) {
    // const posts = [
    //           {
    //             id : "5asdfsaf0",
    //             title:"First Event",
    //             organiser:"abc",
    //             info : "This is  first",
    //             date : "12/04/1999",
    //             content : "Hello world"
    //           },
    //           {
    //             id : "5asdfsaf0",
    //             title:"First Event",
    //             organiser:"abc",
    //             info : "This is  first",
    //             date : "12/04/1999",
    //             content : "Hello world"
    //           },
    //           {
    //             id : "5asdfsaf0",
    //             title:"First Event",
    //             organiser:"abc",
    //             info : "This is  first",
    //             date : "12/04/1999",
    //             content : "Hello world"
    //           },
    //           {
    //             id : "5asdfsaf0",
    //             title:"First Event",
    //             organiser:"abc",
    //             info : "This is  first",
    //             date : "12/04/1999",
    //             content : "Hello world"
    //           }
    // ];
   Post.find().then(documents =>{
    res.status(200).json({
      message:"Posts sent successfully",
      posts : documents
    });
   }); 
  
});

router.get('/api/posts/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message:'Page not found!'});
    }
  });
})

router.post('/api/posts',(req,res,next)=>{
  // const post = req.body;
  const post = new Post({
    title:req.body.title,
    organiser:req.body.organiser,
    info : req.body.info,
    date : req.body.date,
    content : req.body.content

  });
  console.log(post);
  post.save().then(createdPost=>{
    res.status(201).json({
      message:"Post added successfully",
      postId : createdPost._id
    })

  });
});


router.delete('/api/posts/:id',(req,res,next)=>{
  // console.log(req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result)
    res.status(200).json({
      message:"Post deleted!"
    })

  })
})



router.put("/api/posts/:id",(req,res,next)=>{
  const post = new Post({
    title:req.body.title,
    organiser:req.body.organiser,
    info : req.body.info,
    date : req.body.date,
    content : req.body.content
  });
  Post.updateOne({_id:req.params.id, post}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Update successful"
    });
  });
})
module.exports = router;

// bAYTtOAxN7u5fNYP