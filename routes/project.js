const router = require("express").Router();
const projects = require("../models/project");
const { verifyToken } = require("../validation");

// Create a new project
router.post("/create", verifyToken, (req, res) => {
    data = req.body;
    projects.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all projects
router.get("/author/:id", (req, res) => {
    data = req.body;
    projects.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all favourite projects
router.get("/favourite/:id", (res) => {
    projects.find({ favourite: true })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get specific project
router.get("/:id", (req, res) => {
    projects.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;