const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    bodyTitle: {
        type: String,
        required: true,
        minlength: 10,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("Post", PostSchema);


router.get("/", async (req, res)=>{
    const posts = await Post.find()
    res.send(posts)
})

router.get("/:id", async (req, res)=>{
    const post = await Post.findOne({_id: req.params.id});
    if(!post){
        return res.status(404).send("Malumot topilmadi...");
    }
    res.status(200).send(post);
})

router.post("/", async (req, res)=>{
    const { error } = await checkReqBody(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const post = await Post.create({
        title: req.body.title,
        bodyTitle: req.body.bodyTitle
    })

    res.status(201).send(post);
})

router.put("/:id", async (req, res)=>{
    const { error } = await checkReqBody(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        bodyTitle: req.body.bodyTitle
    }, {new: true})

    if (!post)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(post);
})

router.delete("/:id", async (req, res)=>{
    let post = await Post.findByIdAndRemove(req.params.id);

    if (!post)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(post);
})


async function checkReqBody(post){
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        bodyTitle: Joi.string().min(20).required(),
    })
    return schema.validate(post);
}



module.exports = router;