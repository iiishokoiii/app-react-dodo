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

  return (
  <>
    <ul className="list">
      {todoList.map((item, i) => (
        <li
          className={item.checked ? "checked" : ""}
          key={i}
        >{item.title} <Link to={`/delete/${i}`}>Delete</Link> <Link to={`/edit/${i}`}>Edit</Link>
        </li>
      ))}
    </ul>
    <p><Link to="/add">Add Item</Link> </p>
    <p><Link to="/sample">Sample</Link></p>
  </>
  )
}