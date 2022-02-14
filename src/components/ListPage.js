import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PATH } from "../config";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchTodoListAction,
  successFetchTodoListAction,
  toggleTodoAction,
} from "../actions";

export default function ListPage() {
  const todoList = useSelector((state) => state.todoList);
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoListAction());
    axios.get(PATH + "todos").then((res) => {
      dispatch(successFetchTodoListAction(res.data));
    });
  }, []);

  const handleEdit = (item) => () => {
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
  if (isFetchTodoList) {
    return <p>loading...</p>;
  }

  return (
    <>
      <ul className="list">
        {todoList.map((item) => (
          <li className={item.checked ? "checked" : ""} key={item.id}>
            <input type="button" value="done" onClick={handleEdit(item)} />{" "}
            {item.title} <Link to={`/delete/${item.id}`}>Delete</Link>{" "}
            <Link to={`/edit/${item.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Item</Link>
    </>
  );
}
