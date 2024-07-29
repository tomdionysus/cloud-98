import { createElement } from 'react'
import { useComponentState } from '../hooks'
import { TitleBar } from './'

var currentDrag = null;

function Window({ children, style={ }, title, titleBarVisible=true, maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose,
width = 500, height=200, minWidth=200, minHeight=150, top=200, left=200, resizeEnabled = true }) {
  
  const [ state, setState ] = useComponentState({
    position: { width, height, top, left }
  })

  const winStyle = {...style, position:'absolute', ...state.position}

  const posDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({position: {...state.position, top: state.position.top + (e.pageY - currentDrag.dragY), left: state.position.left + (e.pageX - currentDrag.dragX)}})
  }

  const resizeDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({position: {...state.position, width: Math.max(minWidth, state.position.width + (e.pageX - currentDrag.dragX)), height: Math.max(minHeight,state.position.height + (e.pageY - currentDrag.dragY))}})
  }

  const resizeWidthDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({position: {...state.position, width: Math.max(minWidth, state.position.width + (e.pageX - currentDrag.dragX)) }})
  }

  const resizeWidthOffsetDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    var offset = e.pageX - currentDrag.dragX
    if(state.position.width - offset < minWidth) return
    setState({position: {...state.position, width: state.position.width - offset, left: state.position.left+offset }})
  }

  const resizeHeightDragChange = (e) => {
    e = e || window.event;
    e.preventDefault();
    setState({position: {...state.position, height: Math.max(minHeight,state.position.height + (e.pageY - currentDrag.dragY)) }})
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