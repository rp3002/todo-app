import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} deleteTask={() => deleteTask(index)} />
      ))}
    </ul>
  );
};

export default TaskList;
