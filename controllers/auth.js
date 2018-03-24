const jwt = require('jsonwebtoken');

const signUp = (req, res) => res.status(201).send(req.user);

const login = (req, res) => {
    const payload = {id: req.user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({message: "OK", token: token});
}

const logout = (req, res) => {
    res.clearCookie('userid');
    res.status(200).send('Logout done!');
}

module.exports = {
    signUp,
    login,
    logout,
};