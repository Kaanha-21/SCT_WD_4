import { useState } from "react";

function TodoItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const saveEdit = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
          />
        ) : (
          <span className="title">{task.title}</span>
        )}
        <small>
          {task.date} {task.time}
        </small>
      </div>

      <div className="task-actions">
        <button className="done" onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Done"}
        </button>

        <button className="edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
