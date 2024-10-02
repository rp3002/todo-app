import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li>
      {task}
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
