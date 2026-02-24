import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // GET TODOS
  const getTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // ADD TODO
  const addTodo = async () => {

    if (!title) return;

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    setTitle("");
    getTodos();
  };

  // DELETE TODO
  const deleteTodo = async (id) => {

    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    });

    getTodos();
  };

  // UPDATE TODO
  const updateTodo = async () => {

    await fetch(`http://localhost:5000/todos/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        completed: false
      })
    });

    setTitle("");
    setEditId(null);
    getTodos();
  };

  // EDIT
  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo.id);
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (todo) => {

    await fetch(`http://localhost:5000/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed
      })
    });

    getTodos();
  };

  return (
  <div className="min-h-screen bg-gray-200 flex justify-center items-start pt-10">

    <div className="w-1/2 bg-gray-100 rounded-lg border-4 border-purple-300 p-6">

      <h1 className="text-2xl font-bold mb-4">
        TO DO LIST
      </h1>

      {/* Input Section */}

      <div className="bg-purple-200 text-center font-semibold p-3 mb-4 rounded">
        Search Mode Activated
      </div>

      <div className="flex gap-3 mb-6">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Task"
          className="flex-1 border-2 border-purple-400 rounded-lg p-2 outline-none"
        />

        {editId ? (
          <button
            onClick={updateTodo}
            className="bg-gray-500 text-white px-5 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={addTodo}
            className="bg-gray-500 text-white px-5 rounded"
          >
            Save
          </button>
        )}

        <button className="bg-gray-500 text-white px-5 rounded">
          SearchOFF
        </button>

      </div>

      {/* Table */}

      <table className="w-full rounded-lg overflow-hidden">

        <thead>

          <tr className="bg-linear-to-r from-green-600 to-purple-700 text-white">

            <th className="p-3 text-left">Task Description</th>

            <th className="p-3">Status</th>

            <th className="p-3">Created Date</th>

            <th className="p-3">Actions</th>

          </tr>

        </thead>

        <tbody className="bg-purple-100">

          {todos.map(todo => (

            <tr key={todo.id} className="border-b border-purple-200">

              <td className="p-3 flex items-center gap-2">

                {todo.title}

                <button
                  onClick={() => editTodo(todo)}
                  className="text-gray-600"
                >
                  ✏️
                </button>

              </td>

              <td className="text-center">
                {todo.completed ? "Completed" : "Pending"}
              </td>

              <td className="text-center">

                {new Date(todo.created_at).toLocaleDateString()}

              </td>

              <td className="text-center space-x-3">

                <button
                  onClick={() => toggleComplete(todo)}
                  className="text-yellow-500 text-lg"
                >
                  ⏱
                </button>

                <button
                  onClick={() => toggleComplete(todo)}
                  className="text-green-600 text-lg"
                >
                  ✔
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 text-lg"
                >
                  🗑
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);``
}

export default App;