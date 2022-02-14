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

function App(){

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/delete/:id" element={<DeletePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;