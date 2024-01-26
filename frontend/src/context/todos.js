import { createContext, useState } from "react";
import axios from 'axios';

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const editTodoById = async (id, updatedFields) => {
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedFields);

      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, ...response.data };
        }

        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const deleteTodoById = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const createTodo = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/add', {
        task,
      });

      const updatedTodos = [...todos, response.data];
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const fetchFilteredTodos = async (status) => {
    try {
      const response = await axios.get(`http://localhost:3001/tasks/filter/${status}`);
      setTodos(response.data);
    } catch (error) {
      console.error(`Error fetching ${status} tasks:`, error);
    }
  };

  const valueToShare = {
    todos,
    deleteTodoById,
    editTodoById,
    createTodo,
    fetchTodos,
    fetchFilteredTodos,
  };

  return (
    <TodoContext.Provider value={valueToShare}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };
export default TodoContext;
