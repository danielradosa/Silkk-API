const router = require("express").Router();
const users = require("../models/user");
const { verifyToken } = require("../validation");

// Get all users
router.get("/user", (req, res) => {
    data = req.body;
    users.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
});

module.exports = router;