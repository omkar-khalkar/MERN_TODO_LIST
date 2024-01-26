import React, { useState } from 'react';

import useTodoContext from '../hooks/use-todo-context';// Update with the correct path

const EditTask = ({ todo, setEditingTask }) => {
    const { editTodoById } = useTodoContext();

    const [newTaskValue, setNewTaskValue] = useState(todo.task);

    const handleSaveEdit = async () => {
        try {
            console.log(newTaskValue);
            await editTodoById(todo._id, {task: newTaskValue});

            setEditingTask(null);
            setNewTaskValue('');

        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setNewTaskValue('');
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <input
                className="border border-gray-300 p-2 rounded-md flex-1"
                type="text"
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSaveEdit}
            >
                Save
            </button>
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={handleCancelEdit}
            >
                Cancel
            </button>
        </div>
    );
};

export default EditTask;
