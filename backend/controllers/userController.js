const pool = require("../database/db");

// Create Todo
exports.createtodos = async (req, res) => {
  try {
    const title = req.body?.title;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newtodo = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.status(201).json(newtodo.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get All Todos  ✅ THIS WAS MISSING
exports.gettodos = async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todos");
    res.json(alltodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updatetodo = async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body?.title;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const updatedtodo = await pool.query(
      "UPDATE todos SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    res.json(updatedtodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deletetodo = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
