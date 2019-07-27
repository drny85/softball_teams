const User = require('../models/User');

module.exports = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id);
        if (!user.role.league) return res.status(403).json({
            msg: 'access denied'
        })

        next();
    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        });
    }

}