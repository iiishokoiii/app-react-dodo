import { Link } from "react-router-dom";
import React, { useState } from 'react'

export default function AdddPage({addListItem}) {
  const [tmpText, changeTmpText] = useState('') // 子コンポーネント内でのみ使用
  const [errorText, changeErrorText] = useState('')
  const handleAddItem = () => {
    if (!tmpText) {
      changeErrorText('テキストが入力されていません')
      return
    }
    addListItem(tmpText)　//親コンポーネントで定義した関数、propsで渡しているので使用できる
    changeErrorText('')
    changeTmpText('')
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
        onClick={handleAddItem}
      />
      {errorText ? <p>{errorText}</p> : <></>}
      <br />
      <Link to="/">list</Link>
    </div>
  )
}