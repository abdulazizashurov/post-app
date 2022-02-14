const Post = require('../models/postsModel')
const validatorPost = require("../validators/validator");

postCtrl = {
    getPosts: async (req, res) => {
        const posts = await Post.find()
        res.send(posts)
    },
    getPostById: async (req, res) => {
        const post = await Post.findOne({_id: req.params.id});
        if(!post){
            return res.status(404).send("Malumot topilmadi...");
        }
        res.status(200).send(post);
    },
    createPost: async (req, res) => {
        const { error } = await validatorPost(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const post = await Post.create({
            title: req.body.title,
            bodyTitle: req.body.bodyTitle
        })

        res.status(201).send(post);
    },
    updatePost: async (req, res) => {
        try{
            const { error } = await validatorPost(req.body);
            if(error){
                return res.status(400).send(error.details[0].message);
            }

            let post = await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                bodyTitle: req.body.bodyTitle
            })
            if (!post)
                return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

            res.send(post);
        }
        catch (err){
            if(err.name === "CastError"){
                return res.status(400).send("Error");
            }

        }
    },
    deletePost: async (req, res) =>{
        let post = await Post.findByIdAndDelete(req.params.id);

        if (!post)
            return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

        res.send(post);
    }

}
module.exports =  postCtrl;

