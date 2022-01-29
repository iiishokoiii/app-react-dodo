import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'

export default function EditPage() {
  const navigate = useNavigate()
  const params = useParams()
  const editId = Number(params.id)
  const [todoItem, changeTodoItem] = useState(null)
  const [tmpText, changeTmpText] = useState('') //子コンポーネント内でのみ使用

  // 初回レンダリング時にAjaxで、対象のアイテムのデータを取得する
  useEffect(() => {
    axios.get(PATH + 'todo/' + editId).then(res => {
      changeTodoItem(res.data)
      changeTmpText(res.data.title) //ajaxで取得してから代入
    })
  },[])

  const handleEdit = () => {
    const newTodoItem = {
      ...todoItem,
      title: tmpText
    } //todoItem のtitleの名前を変更した連想配列を生成
    axios.put(PATH + 'todo/' + params.id, newTodoItem).then(() => {
      navigate('/')
    }) //ajaxで対象のアイテムを更新
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
        onClick={() => navigate('/')}
      />
    </div>
  )
}