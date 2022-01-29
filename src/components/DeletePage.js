import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'

export default function DeletePage() {
  const navigate = useNavigate()
  const params = useParams()
  const deleteId = Number(params.id)
  const [todoItem, changeTodoItem] = useState([])

  // 初回レンダリング時にAjaxで、対象のアイテムのデータを取得する
  useEffect(()=>{
    axios.get(PATH + 'todo/' + deleteId).then(res => {
      changeTodoItem(res.data);
    })
    },[])

  const handleDelete = () => {
    axios.delete(PATH + 'todo/' + deleteId).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="form">
      <h2>"{todoItem.title}"を削除</h2>
      <input
        type="button"
        value="削除"
        onClick={handleDelete}
      />
      <input
        type="button"
        value="キャンセル"
        onClick={() => { navigate('/') }}
      />
    </div>
  )

}