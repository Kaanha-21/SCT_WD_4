import { useState, useRef } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !time) return;

    onAdd({
      id: Date.now(),
      title,
      date,
      time,
      completed: false,
    });

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            dateRef.current.focus();
          }
        }}
      />

      <input
        type="date"
        ref={dateRef}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            timeRef.current.focus();
          }
        }}
      />

      <input
        type="time"
        ref={timeRef}
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
