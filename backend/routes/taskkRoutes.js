const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.post("/create", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;