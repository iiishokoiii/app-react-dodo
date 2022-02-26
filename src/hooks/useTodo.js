import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DB_URL } from "../config";

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
  editTodoAction,
  successEditTodoAction,
} from "../actions";

function useTodo() {
  const todoList = useSelector((state) => state.todoList);
  const todo = useSelector((state) => state.todo);
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList);
  const isAdding = useSelector((state) => state.isAdding);
  const isDeleting = useSelector((state) => state.isDeleting);
  const isEditing = useSelector((state) => state.isEditing);
  const dispatch = useDispatch();

  const fetchTodoList = () => {
    dispatch(fetchTodoListAction());
    const url = DB_URL + 'todo.json';
    axios.get(url).then((res) => {
      dispatch(successFetchTodoListAction(res.data));
    });
  };

  const toggleTodo = (item) => {
    const url = DB_URL + 'todo/' + item.id + '.json';
    axios
    .put(url, {
      ...item,
      checked: !item.checked,
    })
    .then((res) => {
      //変更点だけ反映
      dispatch(toggleTodoAction(item.id));
    });
  };

  const addTodo = (tmpText) => {
    const newId = Number(todoList.sort((a, b) => b.id - a.id)[0].id) + 1;
    const newItem = { id: newId, title: tmpText, checked: false };
    const url = DB_URL + 'todo/' + newId + '.json';
    dispatch(addTodoAction());
    return axios
    .put(url, newItem)
    .then(() => {
      dispatch(successAddTodoAction());
    });
  }

  const fetchTodo = (id) => {
    const url = DB_URL + 'todo/' + id + '.json';
    dispatch(fetchTodoAction());
    axios.get(url).then((res) => {
      dispatch(successFetchTodoAction(res.data));
    });
  }

  const deleteTodo = (id) => {
    const url = DB_URL + 'todo/' + id + '.json';
    dispatch(deleteTodoAction());
    return axios
      .put(url, {})
    .then((res) => {
      dispatch(successDeleteTodoAction());
    });
  }

  const editTodo = (id, tmpText) => {
    const url = DB_URL + 'todo/' + id + '.json';
    dispatch(editTodoAction());
    return axios
    .put(url, {
      ...todo,
      title: tmpText,
    })
    .then((res) => {
      dispatch(successEditTodoAction());
    });
  }

  
  return {
    todoList,
    todo,
    isFetchTodoList,
    isAdding,
    isDeleting,
    isEditing,
    fetchTodoList,
    toggleTodo,
    addTodo,
    fetchTodo,
    deleteTodo,
    editTodo
  };
}

export default useTodo; 