import React, { useState, useEffect } from 'react';
import './index.css';
import Create from './components/Create';
import TaskShow from './components/TaskShow';
import Search from './components/Search';
import useTodoContext from './hooks/use-todo-context';

const App = () => {
  const { todos, fetchTodos, fetchFilteredTodos } = useTodoContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 

  useEffect(() => {

    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    fetchFilteredTodos(filter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task && todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 min-h-screen'>
      <div className='bg-white p-8 rounded-md shadow-md max-w-3xl w-full'>
        <h1 className='text-3xl font-bold mb-4 text-blue-600'>To Do List</h1>
        <Create />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />


        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>

          <button
            className={`px-4 py-2 rounded-md ${filter === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleFilterChange('complete')}
          >
            Complete
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleFilterChange('incomplete')}
          >
            Incomplete
          </button>
        </div>

        <TaskShow todos={filteredTodos} />
      </div>
    </div>
  );
};

export default App;
