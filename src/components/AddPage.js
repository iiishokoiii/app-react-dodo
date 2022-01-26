import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { PATH } from '../config'

export default function AdddPage() {
  const [tmpText, changeTmpText] = useState('') // 子コンポーネント内でのみ使用
  const [errorText, changeErrorText] = useState('')
  const navigate = useNavigate()

  const handleAdd = () => {
    if (!tmpText) {
      changeErrorText('テキストが入力されていません')
      return
    }
    // addListItem(tmpText)　//親コンポーネントで定義した関数、propsで渡しているので使用できる

    axios.post(PATH + 'todos', {
      title: tmpText,
      checked: false
    }).then(() => {
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
}