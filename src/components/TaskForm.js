import React, {useContext, useState, useEffect} from 'react';
import {TaskListContext} from "../context/TaskContext";

const TaskForm = () => {
  const {addTask, clearList, editItem, editTask} = useContext(TaskListContext);

  const [title, setTitle] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (!editItem) {
      addTask(title);
      setTitle('');
    } else {
      editTask(title, editItem.id)
    }
  };

  const handleChange = event => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
    } else {
      setTitle('');
    }
  }, [editItem]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input value={title} onChange={handleChange} type="text" className="task-input" placeholder="Add task..."
             required/>
      <div className="buttons">
        <button className="btn add-task-btn">
          {editItem ? 'Edit task' : 'Add Task'}
        </button>
        <button onClick={clearList} className="btn clear-btn">
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
