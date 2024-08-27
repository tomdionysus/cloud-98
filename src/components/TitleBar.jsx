import "./TitleBar.css"

const stopPropagation = e => { e.stopPropagation(); e.preventDefault(); }
const stopPropagationAndCall = (e, fn) => { stopPropagation(e); fn && fn(e); }

function TitleBar({ title="Window Title", active, maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose, onMouseDown, onMouseUp }) {
  return (
      <div className={"title-bar"+(!active ? " inactive":"")} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {minimizeVisible ? <button aria-label="Minimize" onMouseDown={stopPropagation} onClick={(e)=>{stopPropagationAndCall(e, onMinimize)}}></button>:null}
          {maximizeVisible ? <button aria-label="Maximize"onMouseDown={stopPropagation} onClick={(e)=>{stopPropagationAndCall(e, onMaximize)}}></button>:null}
          {closeVisible ? <button aria-label="Close" onMouseDown={stopPropagation} onClick={(e)=>{stopPropagationAndCall(e, onClose)}}></button>:null}
        </div>
      </div>
  )
}

export default TitleBar