import { useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'
import { useSelector, useDispatch } from "react-redux"
import {
  fetchTodoListAction,
  successFetchTodoListAction,
  toggleTodoAction,
 } from "../actions"

export default function ListPage() {

  const todoList = useSelector((state) => state.todoList) //グローバルstateを取得する
  const isFetchTodoList = useSelector((state) => state.isFetchTodoList)
  const dispatch = useDispatch()

  // 初回レンダリング時にAjaxでデータ取得し、グローバルstateのtodoListに代入する
  useEffect(() => {
    dispatch(fetchTodoListAction())
    axios.get(PATH + 'todos').then(res => {
      //reducer.js の設定にもとづきグローバルstateの値を更新する
      dispatch(successFetchTodoListAction(res.data));
    })
  }, [])

  const handleToggle = (item) => {
    const newItem = {
      ...item,
      checked: !item.checked,
    }
    axios.put(PATH + "todo/" + item.id, newItem)
    .then((res) => {
      dispatch(toggleTodoAction(item.id));
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