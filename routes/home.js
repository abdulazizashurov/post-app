const express = require("express");
const router = express.Router();

router.get("/", async (req, res)=>{
    const routes = {
        post: [
            "GET: /posts => get all posts",
            "GET: /posts/:id =>  get post by id",
            "POST: /posts/ =>  create post",
            "PUT: /posts/:id =>  update post",
            "DELETE: /posts/:id =>  delete post",
        ],
        users: [
            "Not any data"
        ]
    }
    res.send(routes);
})

module.exports = router;