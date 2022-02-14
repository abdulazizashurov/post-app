const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');


router.get("/", postCtrl.getPosts);

router.get("/:id", postCtrl.getPostById);

router.post("/", postCtrl.createPost);

router.put("/:id", postCtrl.updatePost);

router.delete("/:id", postCtrl.deletePost);


module.exports = router;