import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ListPage from "./components/ListPage";
import AddPage from "./components/AddPage";
import DeletePage from "./components/DeletePage";
import EditPage from "./components/EditPage";
import Header from "./components/Header";
import SampleApp from "./Sample";

function App() {
//   const [list, changeList]  = useState([
//     {
//       title:"Reactのインストール",
//       checked: true,
//       isEditing: false
//     },
//     {
//       title:"JSXを学ぶ",
//       checked:true,
//       isEditing: false
//     },
//     {
//       title:"コンポーネントの分離",
//       checked:false,
//       isEditing: false
//     },
//     {
//       title:"演習",
//       checked:false,
//       isEditing: false
//     }
//   ])

//   //指定したtitleのアイテムを追加する
//   const addListItem = (title) => {
//     const newItem = {
//       title: title,
//       checked: false,
//       isEditing: false
//     }
//     changeList([...list, newItem])
//   }

//   //指定したインデックスのアイテムを削除する
//   const deleteListItem = (deleteIndex) => {
//     const newList = list.filter((item, idx) => idx !== deleteIndex)
//     changeList(newList)
//   }

//   //インデックスで指定したアイテムの title の値を変更する
//   const editListItem = (editIndex, editText) => {
//     const newList = list.map((item, idx) => {
//       if (idx !== editIndex) return item
//       return { ...item, title: editText }
//     })
//     changeList(newList)
//   }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/delete/:id" element={<DeletePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/sample" element={<SampleApp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
