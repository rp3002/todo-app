import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li>
      <strong>{task.text}</strong> <br />
      <span>Category: {task.category}</span> <br />
      <span>Priority: {task.priority}</span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
