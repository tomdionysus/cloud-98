import { useCallback } from 'react'
import { useComponentState } from '../hooks'

import "./SplitPane.css"

var currentDrag = null
const limitRange = (v, min, max) => {
  if(min && v<min) return min
  if(max && v>max) return max
  return v
}
const posDragEnd = (e) => {
  e = e || window.event;
  e.preventDefault()
  currentDrag = null
  document.onmouseup = null
  document.onmousemove = null
}

export default function SplitPane({ left, right, minLeft, maxLeft }) {
  const [ state, setState ] = useComponentState({
    leftWidth: 150
  })

  const dragStart = (e, handler)=>{
    if(currentDrag) return
    e = e || window.event;
    e.preventDefault()
    currentDrag = { dragX: e.pageX, dragY: e.pageY }
    document.onmouseup = posDragEnd
    document.onmousemove = handler
  }

  const posDragChange = useCallback((e) => {
    e = e || window.event;
    e.preventDefault();
    setState({ leftWidth: limitRange(state.leftWidth + e.pageX - currentDrag.dragX, minLeft, maxLeft)})
  }, [ setState, state.leftWidth ])

  return (
    <div className="split-pane">
      <div className="left" style={{width: state.leftWidth+"px"}}>
        {left}
      </div>
      <div className="divider" onMouseDown={e=>dragStart(e, posDragChange)}>
        <div className="handle" /><div className="handle" /><div className="handle" />
      </div>
      <div className="right">
        {right}
      </div>
    </div>
  )
} 