import { createElement } from 'react'
import { useComponentState } from '../hooks'
import { TitleBar } from './'

var currentDrag = null;
const limitRange = (v, min, max) => Math.min(max, Math.max(min, v))
const outsideRange = (v, min, max) => v<min || v>max

function Window({ children, style={ }, title, titleBarVisible=true, maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose,
width = 500, height=300, minWidth, minHeight=150, maxWidth, maxHeight, top=200, left=200, resizeEnabled = true }) {
  
  const [ state, setState ] = useComponentState({
    width, height, top, left
  })

  const winStyle = {...style, padding:'-2px', position:'absolute', overflow:'hidden', display:'flex', flexDirection:'column', width: state.width, height: state.height, top: state.top, left: state.left}

  const posDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({ top: state.top + e.pageY - currentDrag.dragY, left: state.left + e.pageX - currentDrag.dragX})
  }

  const resizeDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({ width: limitRange(state.width + e.pageX - currentDrag.dragX, minWidth, maxWidth), height: limitRange(state.height + e.pageY - currentDrag.dragY, minHeight, maxHeight)})
  }

  const resizeWidthDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    var offset = e.pageX - currentDrag.dragX
    if(outsideRange(state.width + offset, minWidth, maxWidth)) return
    setState({ width: state.width + offset })
  }

  const resizeWidthOffsetDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    var offset = e.pageX - currentDrag.dragX
    if(outsideRange(state.width - offset, minWidth, maxWidth)) return
    setState({ width: state.width - offset, left: state.left+offset })
  }

  const resizeHeightDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({ height: limitRange(state.height + e.pageY - currentDrag.dragY, minHeight, maxHeight) })
  }

  const posDragEnd = (e) => {
    e = e || window.event;
    e.preventDefault()
    currentDrag = null
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const dragStart = (e, handler)=>{
    if(currentDrag) return
    e = e || window.event;
    e.preventDefault()
    currentDrag = { dragX: e.pageX, dragY: e.pageY }
    document.onmouseup = posDragEnd;
    document.onmousemove = handler;
  }

  return (
    <div className="window" style={winStyle}>
      {titleBarVisible ? (
        <TitleBar title={title} onMouseDown={e=>dragStart(e, posDragChange)}/>
      ):null} 
      {children}
      {resizeEnabled ? (
        // Resize Handlers
        <>
          <div style={{ width:8, position: 'absolute', left:0, top:0, bottom:20, cursor: 'ew-resize' }} onMouseDown={e=>dragStart(e, resizeWidthOffsetDragChange)} />
          <div style={{ width:8, position: 'absolute', right:0, top:0, bottom:20, cursor: 'ew-resize' }} onMouseDown={e=>dragStart(e, resizeWidthDragChange)} />
          <div style={{ height:8, position: 'absolute', right:20, bottom:0, left:0, cursor: 'ns-resize' }} onMouseDown={e=>dragStart(e, resizeHeightDragChange)} />
          <div style={{ width:8, height:20, position: 'absolute', right:0, bottom:0, cursor: 'nwse-resize' }} onMouseDown={e=>dragStart(e, resizeDragChange)} />
          <div style={{ width:14, height:8, position: 'absolute', right:8, bottom:0, cursor: 'nwse-resize' }} onMouseDown={e=>dragStart(e, resizeDragChange)} />
        </>
      ):null}
    </div>
  )
}

export default Window