const router = require('express').Router();
const passport = require('passport');
const { dives } = require('./../controllers');
const {
    getDives,
    addDive,
    updateDiveById,
    removeDiveById,
} = dives;

router.route('/')
    .get(passport.authenticate('jwt'), getDives)
    .post(passport.authenticate('jwt'), addDive);

router.route('/:diveId')
    .put(passport.authenticate('jwt'), updateDiveById)
    .delete(passport.authenticate('jwt'), removeDiveById);

module.exports = router;