import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'

export default function ListPage() {

  const [todoList, changeTodoList] = useState([])

  // 初回レンダリング時にAjaxでデータ取得し、todoListに代入する
  useEffect(() => {
    axios.get(PATH + 'todos').then(res => {
      changeTodoList(res.data)
    })
  }, [])

  const handleChangeStatus = (changeId) => {
    const todoItem = todoList.find((item, idx) => item.id === changeId)
    const newTodoItem = {
      ...todoItem,
      checked: true
    }
    axios.put(PATH + 'todo/' + changeId, newTodoItem).then(() => {
      window.location.reload()
    })
  }

  return (
  <>
    <ul className="list">
      {todoList.map((item, i) => (
        <li
          className={item.checked ? "checked" : ""}
          key={i}
        ><input
            type="button"
            value="done"
            onClick={() => handleChangeStatus(item.id)}
        />{item.title} <Link to={`/delete/${item.id}`}>Delete</Link> <Link to={`/edit/${item.id}`}>Edit</Link>
        </li>
      ))}
      </ul>
    <p><Link to="/add">Add Item</Link> </p>
    <p><Link to="/sample">Sample</Link></p>
  </>
  )
}