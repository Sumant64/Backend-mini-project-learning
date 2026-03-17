const express = require("express");
const postTask = require("../controllers/task/postTask");
const getTasks = require("../controllers/task/getTasks");
const markCompleted = require("../controllers/task/markCompleted");

const router = new express.Router();

router.route("/").post(postTask);
router.route("/:id").get(getTasks);
router.route("/mark/:id").get(markCompleted);


module.exports = router;