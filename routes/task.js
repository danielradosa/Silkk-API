const router = require("express").Router();
const project = require("../models/project");
const { verifyToken } = require("../validation");

// Insert a new task into lists
router.post("/addtask", verifyToken, (req, res) => {
    data = req.body;
    project.findByIdAndUpdate(data.projectId, { $push: { lists: data.list } })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;