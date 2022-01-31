import { useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'
import { useSelector, useDispatch } from "react-redux"

export default function ListPage() {

  const todoList = useSelector((state) => state.todoList) //グローバルstateを取得する
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList)
  const dispatch = useDispatch()

  // 初回レンダリング時にAjaxでデータ取得し、グローバルstateのtodoListに代入する
  useEffect(() => {
    dispatch({
      type: "FETCH_TODO_LIST"
    })
    axios.get(PATH + 'todos').then(res => {
      //reducer.js の設定にもとづきグローバルstateの値を更新する
      dispatch({
        type: "SUCCESS_FETCH_TODO_LIST",
        payload: res.data,
      });
    })
  }, [])

  const handleToggle = (item) => {
    const newItem = {
      ...item,
      checked: !item.checked,
    }
    axios.put(PATH + "todo/" + item.id, newItem)
    .then((res) => {
      dispatch({
        type: "TOGGLE_TODO",
        payload: item.id,
      });
    });
  }

  if (isFetchTodoList) {
    return <p>loading...</p>;
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
            onClick={() => handleToggle(item)}
        />{item.title} <Link to={`/delete/${item.id}`}>Delete</Link> <Link to={`/edit/${item.id}`}>Edit</Link>
        </li>
      ))}
      </ul>
    <p><Link to="/add">Add Item</Link> </p>
    <p><Link to="/sample">Sample</Link></p>
  </>
  )
}