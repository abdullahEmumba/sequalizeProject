const express = require("express");
const router = new express.Router();
const todoList = require("../controllers/todoList.controller");

router.post("/create", todoList.addTask);
router.post("/getTasks", todoList.getTasks);
router.patch("/update", todoList.updateTask);
router.post("/total", todoList.countTotal);

module.exports = router;
