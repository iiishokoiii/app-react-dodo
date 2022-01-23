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

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage list={list} />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
