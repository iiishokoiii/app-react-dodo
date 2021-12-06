import './App.css';
import React from 'react'

function Header() {
  return (
    <>
      <h1 className="header">ToDo App</h1>
      <p>TODOが追加できるよ</p>
    </>
  );
}

function List() {
  const list = [
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
  ]
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

function Form() {
  return (
    <div className="form">
      <label htmlFor="text">追加</label>
      <input type="text" id="text" defaultValue="ダミー" />
      <input type="button" value="追加" />
    </div>
  );
}

function App() {
  return (
    <>
      <Header/>
      <List/>
      <Form/>
    </>
  );
}

export default App;
