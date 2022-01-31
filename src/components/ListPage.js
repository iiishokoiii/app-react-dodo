import { useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'
import { useSelector, useDispatch } from "react-redux"

export default function ListPage() {

  const todoList = useSelector((state) => state.todoList) //グローバルstateを取得する
  const dispatch = useDispatch()

  // 初回レンダリング時にAjaxでデータ取得し、グローバルstateのtodoListに代入する
  useEffect(() => {
    axios.get(PATH + 'todos').then(res => {
      //reducer.js の設定にもとづきグローバルstateの値を更新する
      dispatch({
        type: "SET_TODO_LIST",
        payload: res.data,
      });
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