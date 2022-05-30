const { redirect } = require("express/lib/response");

module.exports = {
    post: async (req, res) => {
        return res.clearCookie('jwt', '', { path: '/' })
            .status(200)
            .redirect('/auth');
    },
};