import React, { useState } from 'react';

const RemindersPage = ({ tasks, handleDelete }) => {
  // Sort tasks by reminder date, with the earliest due date first
  const sortedTasks = tasks
    .filter(task => task.reminder) // Filter tasks that have reminders
    .sort((a, b) => new Date(a.reminder) - new Date(b.reminder)); // Sort by reminder date

  const [statusValues, setStatusValues] = useState(
    sortedTasks.reduce((acc, task) => {
      acc[task.id] = 0; // Initialize status value for each task
      return acc;
    }, {})
  );

  const handleStatusChange = (taskId, value) => {
    setStatusValues(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  return (
    <div>
      <h2>Stay on Top of What Matters!</h2>
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            <span>
              {task.text} - {new Date(task.reminder).toLocaleString()}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={statusValues[task.id] || 0}
              onChange={e => handleStatusChange(task.id, e.target.value)}
              aria-label={`Status slider for ${task.text}`}
            />
            <span style={{ marginLeft: '10px' }}>
               {statusValues[task.id] || 0}%
            </span>
            <button 
              onClick={() => handleDelete(task.id)}
              aria-label={`Delete reminder for ${task.text}`}
            >
              Delete Reminder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersPage;
