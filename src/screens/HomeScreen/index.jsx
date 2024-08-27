import { Button, TaskBar, Divider, Menu, MenuItem, Screen } from '../../components'
import { VPCWindow } from '../../windows'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

import CloudSvg from "../../assets/clouds.svg"

const reorderZIndex = (tasks) => {
    const sortedTasks = Object.values(tasks).sort((a, b) => b.zIndex - a.zIndex);
    let newZIndex = 800;
    for (let i = 0; i < sortedTasks.length; i++) {
        const task = sortedTasks[i];
        tasks[task.id].zIndex = newZIndex - i;
    }
    return tasks; // Return the modified tasks object
}

export default function HomeScreen({ onLogout }) {

  const [state, setState] = useComponentState({
    action: 'start',
    tasks: reorderZIndex({ 
      vpc: { id: 'vpc', name: 'VPCs', class: VPCWindow, minimized: false, active: false, order: 1, zIndex: 750 },
      vpc2: { id: 'vpc2', name: 'VPCs (2)', class: VPCWindow, minimized: false, active: false, order: 2, zIndex: 750 }, 
    }),
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
    // console.log(state.tasks[id],'minimized')
    var tasks = {...state.tasks}
    tasks[id] = { ...tasks[id], ...obj}
    reorderZIndex(tasks)
    setState({ tasks })
  }

  const selectTask = (id, obj) => {
    if(!state.tasks[id]) return
    // console.log(state.tasks[id],'selected')
    var tasks = {...state.tasks}
    for(let t of Object.keys(tasks)) { tasks[t].active = false }
    tasks[id].active = true
    tasks[id].minimized = false
    tasks[id].zIndex = 801
    reorderZIndex(tasks)
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
    taskBarRender.push(<Button className={"task"+(task.active ? " active":"")} key={"taskbar_task_"+task.id} onClick={()=>selectTask(task.id)}>{task.name}</Button>)
    windowRender.push(<task.class key={"task_"+task.id} style={{zIndex: task.zIndex}} visible={!task.minimized} active={task.active} onFocus={()=>selectTask(task.id)} onMinimize={()=>updateTask(task.id, { minimized: true, active: false })} onClose={()=>closeTask(task.id)}/>)
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