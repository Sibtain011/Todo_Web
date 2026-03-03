import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // ================= GET TODOS =================
  const getTodos = async () => {
    const res = await fetch("https://todo-web-u6ne.onrender.com");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // ================= ADD TODO =================
  const addTodo = async () => {
    if (!title) return;

    await fetch("https://todo-web-u6ne.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTodos();
  };

  // ================= DELETE TODO =================
  const deleteTodo = async (id) => {
    await fetch(`https://todo-web-u6ne.onrender.com/${id}`, {
      method: "DELETE",
    });

    getTodos();
  };

  // ================= UPDATE TODO =================
  const updateTodo = async () => {
    await fetch(`https://todo-web-u6ne.onrender.com/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    setTitle("");
    setEditId(null);
    getTodos();
  };

  // ================= EDIT =================
  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo.id);
  };

  // ================= TOGGLE COMPLETE =================
  const toggleComplete = async (todo) => {
    await fetch(`https://todo-web-u6ne.onrender.com/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    });

    getTodos();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start pt-6 px-4">
      <div className="w-full max-w-3xl bg-gray-100 rounded-lg border-4 border-purple-300 p-4 md:p-6 shadow-lg">
        
        <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">
          SAVE YOUR TASK
        </h1>

        <div className="bg-purple-200 text-center font-semibold p-3 mb-4 rounded">
          TODAY'S TASK
        </div>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task"
            className="flex-1 border-2 border-purple-400 rounded-lg p-2 outline-none"
          />

          {editId ? (
            <button
              onClick={updateTodo}
              className="bg-gray-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addTodo}
              className="bg-gray-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Save
            </button>
          )}
        </div>

        {/* Table Wrapper (Responsive Scroll) */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-purple-700 text-white">
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Created</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-purple-100">
              {todos.map((todo) => (
                <tr key={todo.id} className="border-b border-purple-200">
                  
                  {/* Task Title */}
                  <td className="p-3 flex items-center gap-2">
                    <span
                      className={
                        todo.completed
                          ? "line-through text-gray-500"
                          : ""
                      }
                    >
                      {todo.title}
                    </span>

                    <button
                      onClick={() => editTodo(todo)}
                      className="text-gray-600"
                    >
                      ✏️
                    </button>
                  </td>

                  {/* Status */}
                  <td className="text-center">
                    {todo.completed ? "Completed" : "Pending"}
                  </td>

                  {/* Date */}
                  <td className="text-center">
                    {new Date(todo.created_at).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="text-center space-x-3">
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
    </div>
  );
}

export default App;
