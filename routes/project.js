const router = require("express").Router();
const project = require("../models/project");
const { verifyToken } = require("../validation");

////////////// PROJECT CALLS /////////////////////////////////////////////////

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

// Remove specific project from favorites
router.put("/removefavorite/:id", verifyToken, (req, res) => {
    data = req.params.id;
    project.findByIdAndUpdate(data, { $set: { favourite: false } })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Delete project 
router.delete("/delete/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    project.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete project with id: " + id });
            } else {
                res.send({ message: "Project was deleted." })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting project with id: " + id }); })
});

////////////////// TASK CALLS /////////////////////////////////////////////////////////////////////

// TODO CRUD /////////////////

// Get all todo lists in a project
router.get("/list/all/:id", verifyToken, (req, res) => {
    project.findById(req.params.id)
    .then(data => { res.send(data.lists); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

// Create a new todo list
router.post("/list/create/:id", verifyToken, (req, res) => {
    data = req.body;
    project.findByIdAndUpdate(req.params.id, { $push: { lists: data } })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Delete a todo list
router.delete("/list/delete/:id/:listId", verifyToken, (req, res) => {
    const id = req.params.id;
    const listId = req.params.listId;
    project.findByIdAndUpdate(id, { $pull: { lists: { _id: listId } } })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete list with id: " + listId });
            } else {
                res.send({ message: "List was deleted." })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting list with id: " + listId }); })
});

// Get all tasks in a todo list
router.get("/list/task/all/:projId/:listId", verifyToken, (req, res) => {
    project.findById(req.params.projId)
        .then(data => {
            for (let i = 0; i < data.lists.length; i++) {
                if (data.lists[i]._id == req.params.listId) {
                    res.send(data.lists[i].todo);
                }
            }
        })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Create new todo task in list
router.post("/list/task/create/:projId/:listId", verifyToken, (req, res) => {
    data = req.body;
    project.findByIdAndUpdate(req.params.projId, { $push: { "lists.$[i].todo": data } }, { arrayFilters: [{ "i._id": req.params.listId }] })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Complete a task in a todo list
router.put("/list/task/complete/:projId/:listId/:taskId", verifyToken, (req, res) => {
    project.findByIdAndUpdate(req.params.projId, { $set: { "lists.$[i].todo.$[j].status": true } }, { arrayFilters: [{ "i._id": req.params.listId }, { "j._id": req.params.taskId }] })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Uncomeplete a task in a todo list
router.put("/list/task/uncomplete/:projId/:listId/:taskId", verifyToken, (req, res) => {
    project.findByIdAndUpdate(req.params.projId, { $set: { "lists.$[i].todo.$[j].status": false } }, { arrayFilters: [{ "i._id": req.params.listId }, { "j._id": req.params.taskId }] })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Delete a task in a todo list
router.delete("/list/task/delete/:projId/:listId/:taskId", verifyToken, (req, res) => {
    project.findByIdAndUpdate(req.params.projId, { $pull: { "lists.$[i].todo": { _id: req.params.taskId } } }, { arrayFilters: [{ "i._id": req.params.listId }] })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete todo task with id: " + id });
            } else {
                res.send({ message: "Todo task was deleted." })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting todo task with id: " + id }); })
});

// NOTE CRUD ///////////////////

// Create a new note
router.post("/note/create/:id", verifyToken, (req, res) => {
    data = req.body;
    project.findByIdAndUpdate(req.params.id, { $push: { notes: data } })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Delete a note
router.delete("/note/delete/:id/:noteId", verifyToken, (req, res) => {
    const id = req.params.id;
    const noteId = req.params.noteId;
    project.findByIdAndUpdate(id, { $pull: { notes: { _id: noteId } } })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete note with id: " + noteId });
            } else {
                res.send({ message: "Note was deleted." })
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting note with id: " + noteId }); })
});

// Get all notes
router.get("/notes/all/:id", verifyToken, (req, res) => {
    project.findById(req.params.id)
        .then(data => { res.send(data.notes); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;