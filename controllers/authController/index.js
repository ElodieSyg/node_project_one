const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const User = require('../../models/User');

module.exports = {
    render: (req, res) => {
        res.render('login', {
            failed: false
        });
    },
    post: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.render('login', {
                    failed: true,
                });
            };

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

                res.cookie('jwt', token, { httpOnly: true, secure: false });


                return res.redirect('/');
            } else {
                return res.render('login', {
                    failed: true,
                });
            };
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                status: 'failed'
            });
        }
    },
};