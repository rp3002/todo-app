import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('General'); // Default category
  const [priority, setPriority] = useState('Medium'); // Default priority
  const [reminder, setReminder] = useState(''); // State for the reminder

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    addTask(task, category, priority, reminder); // Pass reminder to addTask
    setTask('');
    setCategory('General'); // Reset category
    setPriority('Medium'); // Reset priority
    setReminder(''); // Reset reminder
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Assignments">Assignments</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
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
