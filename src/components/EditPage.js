import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage({ list, editListItem }) {
  const navigate = useNavigate()
  const params = useParams()
  const editIndex = Number(params.id)
  const editItem = list.find((item, idx) => idx === editIndex)
  const [tmpText, changeTmpText] = useState(editItem.title) // 子コンポーネント内でのみ使用

  const handleEdit = () => {
    editListItem(editIndex, tmpText)
    changeTmpText('')
    navigate('/')
  }
  const cancelEdit = () => {
    // changeTmpText('')
    navigate('/')
  }

  return (
    <div className="form">
      <label htmlFor="text">編集:</label>
      <input
        type="text"
        id="text"
        value={tmpText}
        onChange={e => { changeTmpText(e.currentTarget.value) }}
      />
      <input
        type="button"
        value="確定"
        onClick={handleEdit}
      />
      <input
        type="button"
        value="キャンセル"
        onClick={cancelEdit}
      />
    </div>
  )

}