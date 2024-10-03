import React from 'react';

function TaskList({ tasks, handleDelete, handleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <strong>{task.text}</strong> <br />
          <span>Category: {task.category}</span> <br />
          <span>Priority: {task.priority}</span>
          <div>
            <button className="complete" onClick={() => handleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
