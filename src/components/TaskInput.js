import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [reminder, setReminder] = useState(''); // State for the reminder

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    addTask(task, null, null, reminder); // Pass null for category and priority
    setTask('');
    setReminder(''); // Reset reminder
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <input
        type="datetime-local"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)} // Update reminder state
        placeholder="Set a reminder"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
