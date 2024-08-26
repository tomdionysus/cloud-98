import "./TaskBar.css"

function TaskBar({ style, children }) {
  return (
    <div className="window taskbar" style={style}>
    {children}
    </div>
  )
}

export default TaskBar