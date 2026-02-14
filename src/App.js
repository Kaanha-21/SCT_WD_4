import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <div className="container">
        <h1>TO-DO WEB APP</h1>

        <TodoForm onAdd={addTask} />

        <div className="task-list">
          {[...tasks]
            .sort((a, b) => {
              const aTime = new Date(`${a.date} ${a.time}`).getTime();
              const bTime = new Date(`${b.date} ${b.time}`).getTime();
              return aTime - bTime;
            })
            .map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
                onEdit={editTask}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
