import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ListPage from "./components/ListPage";
import AddPage from "./components/AddPage";
import Header from "./components/Header";
import SampleApp from "./Sample";

function App() {
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
  const addListItem = (title) => {
    const newItem = {
      title: title,
      checked: false,
      isEditing: false
    }
    changeList([...list, newItem])
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage list={list} />} />
        <Route path="/add" element={<AddPage  addListItem={addListItem} />} />
        <Route path="/sample" element={<SampleApp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
