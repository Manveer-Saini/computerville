const Part = require('../models/part.models');

const jwt = require('jsonwebtoken');

    


module.exports = {
    //Get all parts.
    getAllParts: (req, res) => {
        Part.find()
            .then((allParts) => {
                console.log(allParts);
                res.json(allParts);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get all cpu's.
    getAllCpu: (req, res) => {
        Part.find({type: "cpu"})
            .then((allCpu) => {
                console.log(allCpu);
                res.json(allCpu);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get all gpu's.
    getAllGpu: (req, res) => {
        Part.find({type: "gpu"})
            .then((allGpu) => {
                console.log(allGpu);
                res.json(allGpu);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get all memory parts.
    getAllMemory: (req, res) => {
        Part.find({type: "memory"})
            .then((allMemory) => {
                console.log(allMemory);
                res.json(allMemory);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createPart: (req, res) => {
        console.log(req.body);
        const newPart = new Part(req.body);


        Part.create(newPart)
            .then((part) => {
                console.log(part);
                res.json(part);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
}