import React from 'react';

function TaskList({ tasks, handleDelete, handleComplete }) {
  console.log(tasks); // Log the tasks to inspect their structure

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {/* Ensure task.text is a string */}
          {typeof task.text === 'string' ? task.text : JSON.stringify(task.text)}
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