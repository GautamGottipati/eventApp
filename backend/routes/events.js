var express = require('express');
var router = express.Router();
var multer = require('multer');

var Post = require('../models/post');

var checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

var storage = multer.diskStorage({

  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Valid mime type");
    if(isValid){
      error = null;
      
    }
    
    cb(error,"public/images")
  },
  filename: (req,file,cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'-'+ext);
    console.log(Date.now());
  }
});



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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    console.log(pageSize,currentPage)
    const postQuery = Post.find();
    let fetchedPosts;
    if(pageSize && currentPage){
      postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
    }
   postQuery.then(documents =>{
     fetchedPosts = documents;
     return Post.count();
    // res.status(200).json({
    //   message:"Posts sent successfully",
    //   posts : documents
    // });
   }).then(count=>{
    res.status(200).json({
        message:"Posts sent successfully",
        posts : fetchedPosts,
        maxPosts: count
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

router.post('/api/posts',checkAuth, multer({storage: storage}).single("image") ,(req,res,next)=>{
  // const post = req.body;
  const url = req.protocol + '://'+ req.get("host");
  const post = new Post({
    title:req.body.title,
    organiser:req.body.organiser,
    info : req.body.info,
    date : req.body.date,
    content : req.body.content,
    imagePath : url + "/images/"+ req.file.filename,
    creator : req.userData.userId

  });
  console.log(post);
  post.save().then(createdPost=>{
    res.status(201).json({
      message:"Post added successfully",
      post:{
        ...createdPost,
        id : createdPost._id
        // title:createdPost.title,
        // organiser:createdPost.organiser,
        // info:createdPost.info,
        // date: createdPost.date,
        // content:createdPost.content,
        // imagePath:createdPost.imagePath 
      }
      
    })

  });
});


router.delete('/api/posts/:id',checkAuth,(req,res,next)=>{
  // console.log(req.params.id);
  Post.deleteOne({_id:req.params.id, creator:req.userData.userId}).then(result=>{
    console.log(result)
    if(result.n > 0){
      res.status(200).json({
        message:"Delete successful"
      });
    }else{
      res.status(401).json({message:"Not authorized"});
    }
    });

  
})



router.put("/api/posts/:id",checkAuth, multer({storage: storage}).single("image"),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://'+ req.get("host");
    imagePath = url + "/images/"+ req.file.filename;
  }
  const post = new Post({
    id : req.params.id,
    title:req.body.title,
    organiser:req.body.organiser,
    info : req.body.info,
    date : req.body.date,
    content : req.body.content,
    imagePath :imagePath,
    creator: req.userData.userId
  });
  console.log(post);
  Post.updateOne({_id:req.params.id , creator: req.userData.userId},
    {$set : {title:req.body.title,
            organiser:req.body.organiser,
            info : req.body.info,
            date : req.body.date,
            content : req.body.content,
            imagePath :imagePath}}).then(result=>{
    console.log(result);
    if(result.nModified > 0){
    res.status(200).json({
      message:"Update successful"
    });
  }else{
    res.status(401).json({message:"Not authorized"});
  }
  });
})
module.exports = router;

// bAYTtOAxN7u5fNYP