const bcrypt = require('bcrypt');
// Model
const User = require('../../models/User');
const Article = require('../../models/Article');

module.exports = {
    post: async (req, res) => {
        const { username, email, password, age } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        if (username && email && password && age) {
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                age
            });

            if (user) {
                return res.redirect('/');
            } else {
                return res.status(500).json({
                    message: 'internal server error',
                    status: 'failed',
                });
            };
        } else {
            return res.status(500).json({
                message: 'missing credentials',
                status: 'failed',
            });
        };
    },
    get: async (req, res) => {
        const users = await User.find();
        let isAuth = req.cookies.jwt ? true : false;

        if (!users) {
            return res.status(404).json({
                message: 'users not found',
                status: 'failed',
            });
        };

        return res.render('users', {
            isAuth,
            users,
        });
    },
    get_by_id: async (req, res) => {
        const { id } = req.params;
        let isAuth = req.cookies.jwt ? true : false;

        if (id) {
            const user = await User.findById({ _id: id });
            const articles = await Article.find({ author: id });

            if (!user) {
                return res.status(404).json({
                    message: 'user or articles not found',
                    status: 'failed',
                });
            };

            return res.render('dynamic-user', {
                user,
                articles,
                isAuth,
            });
        };
    },
};