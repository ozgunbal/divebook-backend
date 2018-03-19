const router = require('express').Router();
const passport = require('passport');
const { auth } = require('./../controllers');
const { signUp, login, logout } = auth;

router.route('/signup/')
    .post(passport.authenticate('signup'), signUp);

router.route('/login/')
    .post(passport.authenticate('login'), login);

router.route('/logout/')
    .get(logout);

module.exports = router;