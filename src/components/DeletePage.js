import { useNavigate, useParams } from "react-router-dom";

export default function DeletePage({list, deleteListItem}) {
  const navigate = useNavigate()
  const params = useParams()
  const deleteIndex = Number(params.id)
  const deleteItem = list.find((item, idx) => idx === deleteIndex)
  const handleDelete = () => {
    deleteListItem(deleteIndex)
    navigate('/')
  }

  return (
    <div className="form">
    <h2>"{deleteItem.title}"を削除</h2>
    <input type="button" value="削除" onClick={handleDelete}/>
    </div>
    ) 

}