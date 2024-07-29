import { forwardRef } from 'react';

const TitleBar = forwardRef(function TitleBar({ title="Window Title", maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose, onMouseDown, onMouseUp }, ref) {
  return (
      <div ref={ref} className="title-bar" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {minimizeVisible ? <button aria-label="Minimize" onClick={onMinimize}></button>:null}
          {maximizeVisible ? <button aria-label="Maximize" onClick={onMaximize}></button>:null}
          {closeVisible ? <button aria-label="Close" onClick={onClose}></button>:null}
        </div>
      </div>
  )
})

export default TitleBar