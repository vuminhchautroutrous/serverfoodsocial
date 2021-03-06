const VoteModel = require("../Models/VoteModel");

module.exports.GetByID = (req, res) => {
    VoteModel.GetByID(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.GetByPost = (req, res) => {
    VoteModel.GetByPost(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.Create = (req, res) => {
    VoteModel.Create(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.UpdateByID = (req, res) => {
    VoteModel.UpdateByID(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};
module.exports.DeleteByID = (req, res) => {
    VoteModel.DeleteByID(req.body, (err, data) => {
        if (err) {
            res.status(401).json({
                message: err.message || "Something has been error...",
            });
            return;
        } else {
            res.status(200).json(
                data
            );
            return;
        }
    });
};