import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'
import { useSelector, useDispatch } from "react-redux"
import {
  addTodoAction,
  successAddTodoAction
} from "../actions"

export default function AdddPage() {
  
  const isAdding = useSelector((state) => state.isAdding)
  const dispatch = useDispatch()
  const [tmpText, changeTmpText] = useState('') // 子コンポーネント内でのみ使用
  const [errorText, changeErrorText] = useState('')
  const navigate = useNavigate()

  const handleAdd = () => {
    if (!tmpText) {
      changeErrorText('テキストが入力されていません')
      return
    }
    
    dispatch(addTodoAction());

    axios.post(PATH + 'todos', {
      title: tmpText,
      checked: false
    }).then(() => {
      //Listページに戻るだけなのでStateのListの設定変更は不要
      dispatch(successAddTodoAction())
      navigate("/")
    })
  }

  return (
    <div className="form">
      <label htmlFor="text">追加</label>
      <input
        type="text"
        id="text"
        value={tmpText}
        disabled={isAdding}
        onChange={e => { changeTmpText(e.currentTarget.value) }}
      />
      <input
        type="button"
        value="追加"
        onClick={handleAdd}
      />
      <input
        type="button"
        value="キャンセル"
        onClick={() => { navigate('/') }}
      />
      {errorText ? <p>{errorText}</p> : <></>}
    </div>
  )
  // 追加中はフォームをdisableに設定
}