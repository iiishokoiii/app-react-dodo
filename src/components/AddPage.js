import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTodo from "../hooks/useTodo";

export default function AddPage() {
  const { isAdding, addTodo } = useTodo();
  const [tmpText, changeTmpText] = useState("");
  const navigate = useNavigate();

  const handleAddList = async () => {
    if (!tmpText) return;
    try {
      await addTodo(tmpText);
      navigate("/");
    } catch (e) {
      //失敗した処理
    }
  };

  return (
    <div className="form">
      <label htmlFor="text">追加:</label>
      <input
        type="text"
        id="text"
        value={tmpText}
        disabled={isAdding}
        onChange={(e) => changeTmpText(e.currentTarget.value)}
      />
      <input type="button" value="追加" onClick={handleAddList} />
    </div>
  );
}
