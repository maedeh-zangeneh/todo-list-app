import React, { useState, useEffect } from 'react';
import Advice from './components/Advice';  
import './App.css';  

function App() {
  const [tasks, setTasks] = useState([]);  
  const [newTask, setNewTask] = useState("");  
  const [loading, setLoading] = useState(true);  

  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5');
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);


  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask("");  
    }
  };


  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      {/* New Message at the top */}
      <h4 className="text-center mb-4">Edit <code>src/App.js</code> and save to reload.</h4>
      
      <h2 className="text-center mb-4">ToDo List</h2>
      
      {/* Input and Add Task Button */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>

      {/* Conditional rendering for loading or displaying tasks */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
              </div>
              <button className="btn btn-danger" onClick={() => deleteTask(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Random Advice Component */}
      <Advice />
    </div>
  );
}

export default App;
