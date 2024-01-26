import React, { useState } from 'react';
import useTodoContext from '../hooks/use-todo-context';
import Panel from './Panel';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import EditTask from './EditTask';

const TaskShow = ({ todos }) => {
  const { deleteTodoById, editTodoById } = useTodoContext();
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleEdit = (id) => {
    setEditingTaskId(id);
  };

  const handleDelete = (id) => {
    deleteTodoById(id);
  };

  const handleCheckboxChange = async (id, completed) => {
  try {
    await editTodoById(id, { completed: !completed });
  } catch (error) {
    console.error('Error updating task completion status:', error);
  }
};


  const renderTodos = todos.map((todo) => (
    <div key={todo._id} className="mb-4 w-full">
      <Panel className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        {editingTaskId === todo._id ? (
          <EditTask
            todo={todo}
            setEditingTask={setEditingTaskId}
          />
        ) : (
          <>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo._id, todo.completed)}
                className="mr-3"
              />
              <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
                {todo.task}
              </span>
            </div>
            <div className="flex">
              <CiEdit
                size={25}
                className="text-blue-500 cursor-pointer hover:text-blue-700 mr-4"
                onClick={() => handleEdit(todo._id)}
              />
              <MdDelete
                size={25}
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </>
        )}
      </Panel>
    </div>
  ));

  return <div>{renderTodos}</div>;
};

export default TaskShow;
