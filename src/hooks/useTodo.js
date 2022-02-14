import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../config";

import {
  fetchTodoListAction,
  successFetchTodoListAction,
  toggleTodoAction,
} from "../actions";

function useTodo() {
  const todoList = useSelector((state) => state.todoList);
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList);
  const dispatch = useDispatch();

  const fetchTodoList = () => {
    dispatch(fetchTodoListAction());
    axios.get(PATH + "todos").then((res) => {
      dispatch(successFetchTodoListAction(res.data));
    });
  };

  const toggleTodo = (item) => {
    axios
    .put(PATH + "todo/" + item.id, {
      ...item,
      checked: !item.checked,
    })
    .then((res) => {
      //変更点だけ反映
      dispatch(toggleTodoAction(item.id));
    });
  };
  
  return {
    todoList,
    isFetchTodoList,
    fetchTodoList,
    toggleTodo
  };
}

export default useTodo; 