import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../config";

import {
  fetchTodoListAction,
  successFetchTodoListAction,
  toggleTodoAction,
  addTodoAction,
  successAddTodoAction
} from "../actions";

function useTodo() {
  const todoList = useSelector((state) => state.todoList);
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList);
  const isAdding = useSelector((state) => state.isAdding);
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

  const addTodo = (tmpText) => {
    dispatch(addTodoAction());
    return axios
    .post(PATH + "todo", {
      title: tmpText,
      checked: false,
    })
    .then(() => {
      dispatch(successAddTodoAction());
    });
  }
  
  return {
    todoList,
    isFetchTodoList,
    isAdding,
    fetchTodoList,
    toggleTodo,
    addTodo
  };
}

export default useTodo; 