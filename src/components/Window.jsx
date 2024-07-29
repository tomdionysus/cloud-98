import { createElement } from 'react'
import { useComponentState } from '../hooks'
import { TitleBar } from './'

var currentDrag = null;

function Window({ children, style={ }, title, titleBarVisible=true, maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose }) {
  
  const [ state, setState ] = useComponentState({
    position: {
      width: 500,
      height: 200, 
      top: 300,
      left: 300,
    },
  })

  const winStyle = {...style, position:'absolute', ...state.position}

  function posDragChange(e) {
    e = e || window.event;
    e.preventDefault();
    setState({position: {...state.position, top: state.position.top + (e.pageY - currentDrag.dragY), left: state.position.left + (e.pageX - currentDrag.dragX)}})
  }

  function posDragEnd(e) {
    e = e || window.event;
    e.preventDefault()
    currentDrag = null
    document.onmouseup = null;
    document.onmousemove = null;
    console.log('end')
  }

  const posDragStart = (e)=>{
    e = e || window.event;
    e.preventDefault()
    currentDrag = { dragX: e.pageX, dragY: e.pageY }
    document.onmouseup = posDragEnd;
    document.onmousemove = posDragChange;
  }

  return (
    <div className="window" style={winStyle}>
      {titleBarVisible ? (
        <TitleBar title={title} onMouseDown={posDragStart}/>
      ):null} 
      {children}
    </div>
  )
}

export default Window