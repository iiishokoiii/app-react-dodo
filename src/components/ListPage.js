import { Link } from "react-router-dom"; 

export default function ListPage({list}) {
  return (
  <>
    <ul className="list">
      {list.map((item, i) => (
        <li
          className={item.checked ? "checked" : ""}
          key={i}
        >{item.title}</li>
      ))}
      </ul>
      <p><Link to="/add">Add Item</Link> </p>
      <p><Link to="/sample">Sample</Link></p>
  </>
  )
}