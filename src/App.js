/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My ToDo App!</h1>
        <p>
          Get started by adding your tasks.
        </p>
      </header>
    </div>
  );
}

export default App;
*/
import React, { useState } from 'react';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My ToDo App!</h1>
        <p>Get started by adding your tasks.</p>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

