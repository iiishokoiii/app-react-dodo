import { useState } from "react";
import useTodo from "../hooks/useTodo";

export default function AddPage() {
  const { isAdding, addTodo } = useTodo();
  const [tmpText, changeTmpText] = useState("");

  const handleAddList = () => {
    if (!tmpText) return;
    addTodo(tmpText);
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
