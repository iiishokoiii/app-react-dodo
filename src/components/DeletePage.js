import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../config";

import {
  fetchTodoAction,
  successFetchTodoAction,
  deleteTodoAction,
  successDeleteTodoAction,
} from "../actions";

export default function DeletePage() {
  const todo = useSelector((state) => state.todo);
  const isDeleting = useSelector((state) => state.isDeleting);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodoAction());
    axios.get(PATH + "todo/" + params.id).then((res) => {
      dispatch(successFetchTodoAction(res.data));
    });
  }, []);

  const handleDelete = () => {
    dispatch(deleteTodoAction());
    axios.delete(PATH + "todo/" + params.id).then(() => {
      dispatch(successDeleteTodoAction());
      navigate("/");
    });
  };

  if (!todo) {
    return <p>loading...</p>;
  }

  return (
    <div className="form">
      <h2>{todo.title}を削除</h2>
      <input
        type="button"
        value="削除"
        onClick={handleDelete}
        disabled={isDeleting}
      />
    </div>
  );
}
