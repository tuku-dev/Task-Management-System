const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Change getTasks route to POST
router.post("/getAll", taskController.getTasks);
router.post("/create", taskController.createTask);
router.post("/update", taskController.updateTask);
router.post("/delete", taskController.deleteTask);

module.exports = router;