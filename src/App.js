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
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and register

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

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here (you might want to validate credentials)
    if (username && password) {
      setIsAuthenticated(true); // Simulate successful login
      setUsername('');
      setPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here (e.g., store user credentials)
    if (username && password) {
      alert('User registered!'); // Simulate successful registration
      setIsLogin(true); // Switch back to login after registration
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
                  
                  {/* Login/Register Form */}
                  <div className="auth-form">
                    <h3>{isLogin ? 'Login' : 'Register'}</h3>
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
                      {isLogin ? "Don't have an account?" : "Already have an account?"} 
                      <span onClick={toggleForm} className="toggle-link">
                        {isLogin ? ' Register' : ' Login'}
                      </span>
                    </p>
                  </div>
                </div>
              } 
            />
            <Route
              path="/tasks"
              element={
                isAuthenticated ? (
                  <>
                    <TaskInput addTask={addTask} /> {/* Pass updated addTask function */}
                    <TaskList tasks={tasks} handleDelete={handleDelete} handleComplete={handleComplete} />
                  </>
                ) : (
                  <p>Please log in to access your tasks.</p>
                )
              }
            />
            <Route 
              path="/reminders" 
              element={
                isAuthenticated ? (
                  <RemindersPage tasks={tasks} handleDelete={handleDelete} /> 
                ) : (
                  <p>Please log in to access your reminders.</p>
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


