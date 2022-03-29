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
router.get("/:id", verifyToken, (req, res) => {
    project.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Get all projects by author
router.get("/all/:authorEmail", verifyToken, (req, res) => {
    data = req.params.authorEmail;
    project.find({ authorEmail: data })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Add specific project to favorites
router.put("/addfavorite/:id", verifyToken, (req, res) => {
    data = req.params.id;
    project.findByIdAndUpdate(data, { $set: { favourite: true } })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Delete project 
router.delete("/delete/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    project.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot delete project with id: " + id});
        } else {
            res.send({ message: "Project was deleted."})
        }
    })
    .catch(err => { res.status(500).send({ message: "Error deleting project with id: " + id }); })
});

module.exports = router;