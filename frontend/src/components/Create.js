import React, { useState } from 'react';
import useTodoContext from '../hooks/use-todo-context'; 

const Create = () => {
  const { createTodo } = useTodoContext();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const handleClick = async () => {
    if (task.trim() === '' || loading) {
      return;
    }

    setLoading(true);

    try {
      await createTodo(task);
      setTask('');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mb-4">
      <div className="flex bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={handleChange}
          className="border-2 p-2 w-full mb-4 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          className={`bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Adding Task...' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default Create;
