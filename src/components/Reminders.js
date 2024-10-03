import React from 'react';

const RemindersPage = ({ tasks, handleDelete }) => {
  return (
    <div>
      <h2>Your Reminders</h2>
      <ul>
        {tasks
          .filter(task => task.reminder)
          .map(task => (
            <li key={task.id}>
              {task.text} - Reminder: {new Date(task.reminder).toLocaleString()}
              <button onClick={() => handleDelete(task.id)}>Delete Reminder</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RemindersPage;
