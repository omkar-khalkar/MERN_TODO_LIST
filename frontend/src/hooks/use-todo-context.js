import { useContext } from "react";
import TodoContext from "../context/todos"; // Update with the correct path

function useTodoContext() {
  return useContext(TodoContext);
}

export default useTodoContext;
