const signUp = (req, res) => res.status(201).send(req.user);

const login = (req, res) => {
    res.cookie('userid', req.user.id, { maxAge: 2592000000 });
    res.status(200).send(req.user);
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