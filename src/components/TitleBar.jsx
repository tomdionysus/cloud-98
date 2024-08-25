import "./TitleBar.css"

const stopPropagation = e => e.stopPropagation()

function TitleBar({ title="Window Title", maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose, onMouseDown, onMouseUp }) {
  return (
      <div className="title-bar" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {minimizeVisible ? <button aria-label="Minimize" onMouseDown={stopPropagation} onClick={onMinimize}></button>:null}
          {maximizeVisible ? <button aria-label="Maximize"onMouseDown={stopPropagation}  onClick={onMaximize}></button>:null}
          {closeVisible ? <button aria-label="Close" onMouseDown={stopPropagation}  onClick={onClose}></button>:null}
        </div>
      </div>
  )
}

export default TitleBar