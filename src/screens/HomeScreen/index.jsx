import { Button, TaskBar, Divider, Menu, MenuItem, Screen } from '../../components'
import { VPCWindow } from '../../windows'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

import CloudSvg from "../../assets/clouds.svg"

export default function HomeScreen({ onLogout }) {

  const [state, setState] = useComponentState({
    action: 'start',
    tasks: { vpc: { id: 'vpc', name: 'VPCs', class: VPCWindow, minimized: false, active: true, order: 1 } },
    beginMenuVisible: false,
    componentsMenuVisible: false,
  })

  const api = useAPI()

  const handleLogout = ()=>{
    api.logout((err)=>{
      onLogout()
    })
  }

  const updateTask = (id, obj) => {
    if(!state.tasks[id]) return
    var tasks = {...state.tasks}
    tasks[id] = { ...tasks[id], ...obj}
    setState({ tasks })
  }

  const closeTask = (id) => {
    if(!state.tasks[id]) return
    var tasks = {...state.tasks}
    delete tasks[id]
    setState({ tasks })
  }

  var taskBarRender = [], windowRender = []
  for(let id of Object.keys(state.tasks).sort((a,b)=>state.tasks[a].order - state.tasks[b].order )) {
    let task = state.tasks[id]
    taskBarRender.push(<Button style={{textAlign: 'left', fontWeight:'bold', width:"150px"}} key={"taskbar_task_"+task.id} onClick={()=>updateTask(task.id, { minimized: false })}>{task.name}</Button>)
    windowRender.push(<task.class key={"task_"+task.id} visible={!task.minimized} onMinimize={()=>updateTask(task.id, { minimized: true })} onClose={()=>closeTask(task.id)}/>)
  }

  return (
    <Screen>
        <TaskBar>
            <Button style={{display:'flex', flexDirection:'row', gap: '5px', alignItems:'center',fontWeight:'bold'}} onClick={()=>setState({ beginMenuVisible: !state.beginMenuVisible })}>
            <img src={CloudSvg} height="14px" alt="cloud98 Logo"/>Begin</Button>
            <Divider />
            {taskBarRender}
        </TaskBar>
        <Menu visible={state.beginMenuVisible} bottom="30px" left="2px" width="250px" onClose={()=>setState({ beginMenuVisible: false })}>
          <MenuItem title="Components" onMouseOver={()=>setState({ componentsMenuVisible: true })} onMouseOut={()=>setState({ componentsMenuVisible: false })} >
            <Menu visible={state.componentsMenuVisible} left="250px" bottom="30px" width="250px" height="250px">
              <MenuItem title="VPCs"></MenuItem>
            </Menu>
          </MenuItem>
          <MenuItem title="Nodes"></MenuItem>
          <MenuItem title="Account"></MenuItem>
          <Divider direction='horizontal'/>
          <MenuItem title="Log Out" onClick={handleLogout}></MenuItem>
        </Menu>
        {windowRender}
    </Screen>
  )
}