import './App.css';
import React, { useState } from 'react'


function Header() {
  return (
    <>
      <h1 className="header">ToDo App</h1>
      <p>TODOが追加できるよ</p>
    </>
  );
}

function List({ list }) {
  return (
    <ul className="list">
      {list.map((item, i) => (
        <li
          className={item.checked ? "checked" : ""}
          key={i}
        >{item.title}</li>
      ))}
    </ul>
  )
}

function Form({addItem}) {
  const [tmpText, changeTmpText] = useState('') // 子コンポーネント内でのみ使用
  const [errorText, changeErrorText] = useState('')
  const handleAddItem = () => {
    if (!tmpText) {
      changeErrorText('テキストが入力されていません')
      return
    }
    addItem(tmpText)　//親コンポーネントで定義した関数、propsで渡しているので使用できる
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
      { errorText ? <p>{errorText}</p> : <></>}
    </div>
  )
}

function App() {
  const [list, changeList]  = useState([
    {
      title:"Reactのインストール",
      checked:true
    },
    {
      title:"JSXを学ぶ",
      checked:true
    },
    {
      title:"コンポーネントの分離",
      checked:false
    },
    {
      title:"演習",
      checked:false
    }
  ])

  const addItem = (title) => {
    const newItem = {
      title: title,
      checked: false
    }
    changeList([...list, newItem])
  }

  return (
    <>
      <Header/>
      <List
        list={list}
        />
      <Form
        addItem={addItem}
      />
    </>
  )
}

export default App;
