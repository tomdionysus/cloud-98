import { Window, WindowBody, Button, TextBox, Label, Layout } from './'

function TaskBar({ style, children }) {
  const winStyle = {...style, position:'absolute', overflow:'hidden', display:'flex', flexDirection:'row', height: '24px', bottom: '0px', left: '0px', right:'0px'}
  return (
    <div className="window" style={winStyle}>
    {children}
    </div>
  )
}

export default TaskBar