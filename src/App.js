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

  const addTask = (taskText, category, priority, reminder) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      category: category || 'General', // Default category
      priority: priority || 'Medium', // Default priority
      completed: false,
      reminder: reminder || null, // Store reminder
    };

    const newTasks = [...tasks, newTask];
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
          <h1>Welcome to Your Personal Task Organiser!</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/reminders">Reminders</Link>
          </nav>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <h2>Your Journey to Success Starts Here!</h2>
                  <p>
                    This app will help you stay organised by providing a simple
                    interface for managing your tasks, setting reminders, and tracking deadlines. 
                    With easy-to-use features, you can categorise your tasks, prioritise 
                    them, and receive notifications to ensure you never miss an important deadline.
                  </p>
                  <p>
                    Whether it's your assignments, personal projects, or work-related tasks, 
                    this tool will help you to take control of your time and achieve your goals.
                  </p>
                </div>
              } 
            />
            <Route
              path="/tasks"
              element={
                <>
                  <TaskInput addTask={addTask} /> {/* Pass updated addTask function */}
                  <TaskList tasks={tasks} handleDelete={handleDelete} handleComplete={handleComplete} />
                </>
              }
            />
            <Route 
              path="/reminders" 
              element={<RemindersPage tasks={tasks} handleDelete={handleDelete} />} 
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
