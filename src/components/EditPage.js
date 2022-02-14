import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "../config";

import {
  fetchTodoAction,
  successFetchTodoAction,
  editTodoAction,
  successEditTodoAction,
} from "../actions";

export default function EditPage() {
  const todo = useSelector((state) => state.todo);
  const isEditing = useSelector((state) => state.isEditing);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [tmpText, changeTmpText] = useState("");

  useEffect(() => {
    dispatch(fetchTodoAction());
    axios.get(PATH + "todo/" + params.id).then((res) => {
      changeTmpText(res.data.title);
      dispatch(successFetchTodoAction(res.data));
    });
  }, []);

  const handleEdit = () => {
    dispatch(editTodoAction());
    axios
      .put(PATH + "todo/" + params.id, {
        ...todo,
        title: tmpText,
      })
      .then((res) => {
        dispatch(successEditTodoAction());
        navigate("/");
      });
  };
  if (!todo) {
    return <p>loading...</p>;
  }
  return (
    <div className="form">
      <label htmlFor="text">編集:</label>
      <input
        type="text"
        id="text"
        value={tmpText}
        onChange={(e) => changeTmpText(e.currentTarget.value)}
      />
      <input
        type="button"
        value="編集"
        onClick={handleEdit}
        disabled={isEditing}
      />
    </div>
  );
}
