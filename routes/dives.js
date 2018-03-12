const router = require('express').Router();
const { dives } = require('./../controllers');
const {
    getDives,
    addDive,
    updateDiveById,
    removeDiveById,
} = dives;

router.route('/')
    .get(getDives)
    .post(addDive);

router.route('/:diveId')
    .put(updateDiveById)
    .delete(removeDiveById);

module.exports = router;