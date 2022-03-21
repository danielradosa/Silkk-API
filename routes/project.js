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
router.get("/all", verifyToken, (req, res) => {
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

// Get all favourite projects by author
router.get("/favourite/:authorEmail", /*verifyToken,*/ (req, res) => {
    data = req.params.author;
    project.find({ author: data }, {favourite: 'true'})
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all non-favourite projects by author
router.get("/normal/:authorEmail", /*verifyToken,*/ (req, res) => {
    data = req.params.authorEmail;
    project.find({ authorEmail: data }, {favourite: 'false'})
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;