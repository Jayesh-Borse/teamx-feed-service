const router = require("express").Router();
const Post = require("../models/post.model.js");
//create post

router.post("/",async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//update post

router.put("/:postId", async (req,res)=>{
    try{
        const post = Post.findById(req.params.postId);
        if(post.userId === req.body.userId)
        {
            await post.updateOne({$set : req.body});
            res.status(200).json("The post has been updated");
        }
        else{
            res.status(403).json("You can only update your post");
        }

    }catch(err){
        res.status(500).json(err);
    }
});

//delete post

router.delete("/:postId", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//get post
router.get("/:postId", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

// like-dislike a post
router.put("/:postId/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push : {likes:req.body.userId}});
            res.status(200).json("The post has been liked !")
        }else{
            await post.updateOne({$pull : {likes : req.body.userId}});
            res.status(200).json("The post has been disliked !")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.post(
    "/comment/:postId",
    (req, res) => {
  
      Post.findById(req.params.postId)
        .then(post => {
          const newComment = {
            text: req.body.text,
            userId: req.body.userId
          };
  
          // Add to comments array
          post.comments.unshift(newComment);
  
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    }
  );
  
  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Remove comment from post
  // @access  Private
  router.delete(
    "/comment/:id/:comment_id",
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: "Comment does not exist" });
          }
  
          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
  
          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
  
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    }
  );


//get posts in feed 
router.get("/",async (req,res)=>{
    try{
        const allPosts = await Post.find({});
        allPosts.reverse();
        res.status(200).json(allPosts);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;