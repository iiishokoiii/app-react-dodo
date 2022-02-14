import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../config";

import {
  fetchTodoListAction,
  successFetchTodoListAction,
  toggleTodoAction,
  addTodoAction,
  successAddTodoAction,
  fetchTodoAction,
  successFetchTodoAction,
  deleteTodoAction,
  successDeleteTodoAction,
} from "../actions";

function useTodo() {
  const todoList = useSelector((state) => state.todoList);
  const todo = useSelector((state) => state.todo);
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList);
  const isAdding = useSelector((state) => state.isAdding);
  const isDeleting = useSelector((state) => state.isDeleting);
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

  const fetchTodo = (id) => {
    dispatch(fetchTodoAction());
    axios.get(PATH + "todo/" + id).then((res) => {
      dispatch(successFetchTodoAction(res.data));
    });
  }

  const deleteTodo = (id) => {
    dispatch(deleteTodoAction());
    axios.delete(PATH + "todo/" + id).then(() => {
      dispatch(successDeleteTodoAction());
      
    });
  }
  
  return {
    todoList,
    todo,
    isFetchTodoList,
    isAdding,
    isDeleting,
    fetchTodoList,
    toggleTodo,
    addTodo,
    fetchTodo,
    deleteTodo
  };
}

export default useTodo; 