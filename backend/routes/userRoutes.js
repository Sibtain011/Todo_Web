const express = require("express");
const router = express.Router();
const {createtodos, gettodos, deletetodo, updatetodo} = require("../controllers/userController");


router.post("/", createtodos);
router.get("/", gettodos);
router.put("/:id", updatetodo);
router.delete("/:id", deletetodo);

module.exports = router;
