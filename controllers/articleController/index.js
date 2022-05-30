// Model
const Article = require('../../models/Article');

module.exports = {
    render: async (req, res) => {
        const articles = await Article.find().populate('author');
        let isAuth = req.cookies.jwt ? true : false;
        let isCreated = false;

        if (!articles) {
            return res.status(404).json({
                message: 'articles not found',
                status: 'failed',
            });
        };

        return res.render('index', {
            articles,
            isAuth,
            isCreated,
        });
    },
    post: async (req, res) => {
        const { title, description } = req.body;

        if (title && description) {
            const newArticle = await Article.create({
                title,
                description,
                author: req.cookies.jwtData._id,
            });

            if (!newArticle) {
                return res.status(500).json({
                    message: 'internal server error',
                    status: 'failed',
                });
            };

            return res.redirect('/myArticles');
        };
    },
    get_by_id: async (req, res) => {
        const { id } = req.params;
        let isAuth = req.cookies.jwt ? true : false;

        if (id) {
            const article = await Article.findById(id).populate('author');

            if (!article) {
                return res.status(404).json({
                    message: 'article not found',
                    status: 'failed',
                });
            };

            return res.render('dynamic-article', {
                isAuth,
                article,
            });
        };
    },
    patch: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        let isAuth = req.cookies.jwt ? true : false;

        if (id) {
            const article = await Article.findByIdAndUpdate({ title, description });

            if (!article) {
                return res.status(404).json({
                    message: 'article not found',
                    status: 'failed',
                });
            };

            return res.status(200).json({
                message: 'article succefully updated',
                status: 'success',
                article,
            });
        };
    },
    delete: async (req, res) => {
        const { id } = req.params;
        let isAuth = req.cookies.jwt ? true : false;

        if (id) {
            const article = await Article.findByIdAndDelete({ _id: id });

            if (!article) {
                return res.status(404).json({
                    message: 'article not found',
                    status: 'failed',
                });
            };

            return res.redirect('/myArticles');
        };
    },
};