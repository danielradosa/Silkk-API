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

// Get specific project
router.get("/:id", (req, res) => {
    projects.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all projects by author
router.get("/author/:name", verifyToken, (req, res) => {
    data = req.body.userProjects;
    projects.find({ author: this.name })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all favourite projects
router.get("/favourite/:id", (res) => {
    projects.find({ favourite: true })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;