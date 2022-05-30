const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    author: {
        type: mongoose.Types.ObjectId, ref: "users",
    },
});

const Article = new mongoose.model("articles", ArticleSchema);

module.exports = Article;