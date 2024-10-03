import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import RemindersPage from './components/Reminders';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (taskText) => {
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: taskText, completed: false, reminder: null },
    ];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My ToDo App!</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/reminders">Reminders</Link>
          </nav>
          <Routes>
            <Route path="/" element={<h2>Overview of the App</h2>} />
            <Route
              path="/tasks"
              element={
                <>
                  <TaskInput addTask={addTask} />
                  <TaskList tasks={tasks} handleDelete={handleDelete} handleComplete={handleComplete} />
                </>
              }
            />
            <Route path="/reminders" element={<RemindersPage tasks={tasks} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

