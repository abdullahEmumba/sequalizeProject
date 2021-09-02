const express = require("express");
const router = new express.Router();
const users = require("../controllers/user.controller");

router.get('/syncTable', users.syncTable)

router.post('/create', users.createUser)

router.patch('/update', users.updateUser)

router.delete('/delete', users.deleteUser)

router.get('/count', users.countTotal)

module.exports = router;