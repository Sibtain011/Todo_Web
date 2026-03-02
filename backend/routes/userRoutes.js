const express = require("express");
const router = express.Router();
const {createtodos, gettodos, deletetodo, updatetodo} = require("../controllers/userController");


router.post("/todos", createtodos);
router.get("/todos", gettodos);
router.put("/todos/:id", updatetodo);
router.delete("/todos/:id", deletetodo);

module.exports = router;
