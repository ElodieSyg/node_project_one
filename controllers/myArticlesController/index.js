// Model
const Article = require('../../models/Article');

module.exports = {
    get: async (req, res) => {
        try {
            const articles = await Article.find({ author: req.cookies.jwtData._id }).populate('author');
            const isAuth = req.cookies.jwt ? true : false;
            let isCreated = false;

            return res.render('articles', {
                articles,
                isAuth,
                isCreated,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                status: 'fail',
            });
        };
    },
};