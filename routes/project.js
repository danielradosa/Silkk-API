const router = require("express").Router();
const project = require("../models/project");
const { verifyToken } = require("../validation");

// Create a new project
router.post("/create", verifyToken, (req, res) => {
    data = req.body;
    project.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all projects ever
router.get("/all", (req, res) => {
    data = req.body;
    project.find(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get specific project
router.get("/:id", (req, res) => {
    project.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all projects by author
router.get("/all/:author", verifyToken, (req, res) => {
    data = req.params.author;
    project.findOne({ author: data })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all favourite projects by author
router.get("/favourite/:author", verifyToken, (req, res) => {
    data = req.params.author;
    project.find({ author: data }, {favourite: true})
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;