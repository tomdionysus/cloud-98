import "./TreeView.css"

export default function TreeView({ children }) {
  return (
    <div className="tree-view-container">
      <ul className="tree-view">
      {children}
      </ul>
    </div>
  )
}

