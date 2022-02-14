const mongoose = require("mongoose");

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
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);