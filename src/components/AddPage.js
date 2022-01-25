import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function AdddPage({addListItem}) {
  const [tmpText, changeTmpText] = useState('') // 子コンポーネント内でのみ使用
  const [errorText, changeErrorText] = useState('')
  const navigate = useNavigate()

  const handleAdd = () => {
    if (!tmpText) {
      changeErrorText('テキストが入力されていません')
      return
    }
    addListItem(tmpText)　//親コンポーネントで定義した関数、propsで渡しているので使用できる
    changeErrorText('')
    changeTmpText('')
    navigate("/")
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
      {errorText ? <p>{errorText}</p> : <></>}
    </div>
  )
}