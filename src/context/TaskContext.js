import React, {createContext, useEffect, useState} from "react";

export  const TaskListContext = createContext();

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('tasks'))
    || [];

  const [tasks, setTasks] = useState(initialState);

  useEffect( () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = title => {
    setTasks([...tasks, {title, id: tasks.length + 1}]);
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const clearList = () => {
    setTasks([]);
  }

  const [editItem, setEditItem] = useState(null);

  const editTask = (title,id) => {
    const newTasks = tasks.map( task => task.id === id ? {title, id} : task);
    setTasks(newTasks);
    setEditItem(null);
  };

  const findItem = id => {
   const item = tasks.find(task => task.id === id);
   setEditItem(item);
  }

  return (
    <TaskListContext.Provider value={{tasks, addTask, removeTask, clearList, findItem, editTask ,editItem}}>
      {props.children}
    </TaskListContext.Provider>
  )
};

export default TaskListContextProvider;
