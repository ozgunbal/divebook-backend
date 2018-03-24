const { Dive } = require('./../models');

const getDives = (req, res, next) => {
    Dive.find({user: req.user._id})
        .then(dives => res.status(200).send(dives))
        .catch(next);
};

const addDive = (req, res, next) => {
    const newDive = new Dive({
        ...req.body,
        user: req.user._id
    });
    newDive.save()
        .then(result => res.status(201).send(result))
        .catch(next);
};

const updateDiveById = (req, res, next) => {
    const { diveId } = req.params;
    Dive.findOneAndUpdate({ _id: diveId}, { $set: req.body }, {new: true})
        .then(result => res.status(201).send(result))
        .catch(next);
};

const removeDiveById = (req, res, next) => {
    const { diveId } = req.params;
    Dive.findOneAndRemove({ _id: diveId})
        .then(result => res.status(204).send(result))
        .catch(next);
};

module.exports = {
    getDives,
    addDive,
    updateDiveById,
    removeDiveById,
};