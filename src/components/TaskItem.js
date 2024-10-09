import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li>
      <div>
        <strong>{task.text}</strong> <br />
        <span>Category: {task.category}</span> <br />
        <span>Priority: {task.priority}</span>
      </div>
      <div>
        <button 
          onClick={deleteTask} 
          aria-label={`Delete task ${task.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
