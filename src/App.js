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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  const addTask = (taskText, category, priority, reminder) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      category: category || 'General',
      priority: priority || 'Medium',
      completed: false,
      reminder: reminder || null,
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      alert('User registered!');
      setIsLogin(true); // Switch back to login
      setUsername('');
      setPassword('');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Organiser</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/reminders">Reminders</Link>
          </nav>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="auth-container">
                  <h2>{isLogin ? 'Login' : 'Register'}</h2>
                  <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                  </form>
                  <p>
                    <span onClick={toggleForm} className="toggle-link">
                      {isLogin ? 'Register' : 'Login'}
                    </span>
                  </p>
                </div>
              } 
            />
            <Route
              path="/tasks"
              element={
                isAuthenticated ? (
                  <>
                    <TaskInput addTask={addTask} />
                    <TaskList tasks={tasks} handleDelete={handleDelete} handleComplete={handleComplete} />
                  </>
                ) : (
                  <p className="auth-warning">Please log in to access your tasks.</p>
                )
              }
            />
            <Route 
              path="/reminders" 
              element={
                isAuthenticated ? (
                  <RemindersPage tasks={tasks} handleDelete={handleDelete} /> 
                ) : (
                  <p className="auth-warning">Please log in to access your reminders.</p>
                )
              } 
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
