import './App.css';
import React, { useState, Fragment } from 'react'



// list の内容を表示する
// アイテムの isEditing が true の場合は編集モードで表示する
// htmlにタグを出力したくない場合に、 React.Fragment を使用する
function List({ list, editItem, startEditihg, finishEditing }) {
  console.log(list)
  return (
    <ul className="list">
      {list.map((item, i) => (
        <React.Fragment key={i}>
          {!item.isEditing
            ?
            <>
              <li
                className={item.checked ? "checked" : ""}
              >{item.title}</li>
              <button
                onClick={() => startEditihg(i)}
              >編集</button>
            </>
            :
            <li>
              <Editor editItem={editItem} finishEditing={finishEditing} itemTitle={item.title} index={i} />
            </li>
          }
        </React.Fragment>
      ))}
    </ul>
  )
}

// 追加ボタンを押すとアイテムを追加できる
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

//アイテム単位の編集モード、確定とキャンセルができる
//editItem, finishEditing: function
//itemTitle: 編集前のタイトル初期値
//index: 編集するアイテムのインデックス
function Editor({editItem, finishEditing, itemTitle, index}) {
  const [tmpText, changeTmpText] = useState(itemTitle) // 子コンポーネント内でのみ使用

  return (
    <div className="form">
      <input
        type="text"
        id="text"
        value={tmpText}
        onChange={e => { changeTmpText(e.currentTarget.value) }}
      />
      <button
        onClick={() => editItem(tmpText, index)}
      >change</button>
      <button
        onClick={() => {
          finishEditing(index)
          changeTmpText(itemTitle)
        }}
      >cancel</button>
    </div>
  )
}

function SampleApp() {
  const [list, changeList]  = useState([
    {
      title:"Reactのインストール",
      checked: true,
      isEditing: false
    },
    {
      title:"JSXを学ぶ",
      checked:true,
      isEditing: false
    },
    {
      title:"コンポーネントの分離",
      checked:false,
      isEditing: false
    },
    {
      title:"演習",
      checked:false,
      isEditing: false
    }
  ])

  //指定したtitleのアイテムを追加する
  const addItem = (title) => {
    const newItem = {
      title: title,
      checked: false,
      isEditing: false
    }
    changeList([...list, newItem])
  }
  
  //インデックスで指定したアイテムの title の値を変更する
  const editItem = (title, editIndex) => {
    const tmpList = list.map((item, idx) => {
      if (idx === editIndex) {
        return {...item, title: title, isEditing: false}
      } else {
        return item
      }
    })
    changeList(tmpList)
  }

  //インデックスで指定したアイテムの iseEditing の値をTrueに変更する
  const startEditing = (editIndex) => {
    const tmpList = list.map((item, idx) => {
      if (idx === editIndex) {
        return {...item, isEditing: true}
      } else {
        return item
      }
    })
    changeList(tmpList)
  }

  //インデックスで指定したアイテムの iseEditing の値をFalseに変更する
  const finishEditing = (editIndex) => {
    const tmpList = list.map((item, idx) => {
      if (idx === editIndex) {
        return {...item, isEditing: false}
      } else {
        return item
      }
    })
    changeList(tmpList)
  }

  return (
    <>
      <List
        list={list}
        editItem={editItem}
        startEditihg={startEditing}
        finishEditing={finishEditing}
        />
      <Form
        addItem={addItem}
      />
    </>
  )
}

export default SampleApp;
