import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodo from "../hooks/useTodo";

export default function DeletePage() {
  const { todo, isDeleting, fetchTodo, deleteTodo } = useTodo();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo(params.id);
  }, []);

  const handleDelete = async () => {
    await deleteTodo(params.id);
    navigate("/");
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
