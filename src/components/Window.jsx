import { useCallback } from 'react'
import { useComponentState } from '../hooks'
import { TitleBar } from './'

var currentDrag = null
const limitRange = (v, min, max) => {
  if(min && v<min) return min
  if(max && v>max) return max
  return v
}
const outsideRange = (v, min, max) => v<min || v>max
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

export default function Window({ children, visible=true, style={ }, title, titleBarVisible=true, maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose,
width = 500, height=300, minWidth=150, minHeight=150, maxWidth, maxHeight, top=200, left=200, resizeEnabled = true }) {

  const [ state, setState ] = useComponentState({
    width, height, top, left
  })

  const posDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    setState({ top: state.top + e.pageY - currentDrag.dragY, left: state.left + e.pageX - currentDrag.dragX})
  }, [ setState, state.left, state.top ])

  const resizeDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    var offsetX = e.pageX - currentDrag.dragX
    var offsetY = e.pageY - currentDrag.dragY
    setState({ width: limitRange(state.width + offsetX, minWidth, maxWidth), height: limitRange(state.height + offsetY, minHeight, maxHeight) })
  }, [ setState, minHeight, maxHeight, minWidth, maxWidth, state.height, state.width ])

  const resizeWidthDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    var offsetX = e.pageX - currentDrag.dragX
    setState({ width: limitRange(state.width + offsetX, minWidth, maxWidth) })
  }, [ setState, maxWidth, minWidth, state.width ])

  const resizeWidthOffsetDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    var offset = e.pageX - currentDrag.dragX
    if(outsideRange(state.width - offset, minWidth, maxWidth)) return
    setState({ width: state.width - offset, left: state.left+offset })
  }, [ setState, maxWidth, minWidth, state.left, state.width ])

  const resizeHeightDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    var offsetY = e.pageY - currentDrag.dragY
    setState({ height: limitRange(state.height + offsetY, minHeight, maxHeight) })
  }, [ setState, maxHeight, minHeight, state.height ])

  if(!visible) return null

  const winStyle = {...style, position:'absolute', overflow:'hidden', display:'flex', flexDirection:'column', width: state.width, height: state.height, top: state.top, left: state.left}

  return (
    <div className="window" style={winStyle}>
      {titleBarVisible ? (
        <TitleBar title={title} onMouseDown={e=>dragStart(e, posDragChange)} onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose}/>
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
