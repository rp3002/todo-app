import React from 'react';

const RemindersPage = ({ tasks, handleDelete }) => {
  return (
    <div>
      <h2>Stay on Top of What Matters!</h2>
      <ul>
        {tasks
          .filter(task => task.reminder)
          .map(task => (
            <li key={task.id}>
              <span>{task.text} - Reminder: {new Date(task.reminder).toLocaleString()}</span>
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
