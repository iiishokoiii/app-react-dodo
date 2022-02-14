import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodo from "../hooks/useTodo";

export default function EditPage() {
  const { todo, isEditing, fetchTodo, editTodo } = useTodo();
  const params = useParams();
  const navigate = useNavigate();
  const [tmpText, changeTmpText] = useState("");

  useEffect(() => {
    fetchTodo(params.id);
    // changeTmpText(todo.title)
  }, []);

  useEffect(() => {
    if (!todo) return;
    changeTmpText(todo.title);
  }, [todo]);

  const handleEdit = async () => {
    await editTodo(params.id, tmpText);
    navigate("/");
  };
  if (!todo) {
    return <p>loading...</p>;
  }
  return (
    <div className="form">
      <label htmlFor="text">編集:{todo.title}</label>
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
