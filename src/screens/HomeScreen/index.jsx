import { Window, WindowBody, Button, TextBox, Label, Layout, TaskBar, Divider } from '../../components'
import { VPCWindow } from '../../windows'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

export default function HomeScreen({ onLogout }) {

  const [state, setState] = useComponentState({
    action: 'start',
  })

  const api = useAPI()

  const handleLogout = ()=>{
    api.logout((err)=>{
      onLogout()
    })
  }

  return (
    <>
    <TaskBar>
        <Button onClick={handleLogout}>cloud98</Button>
        <Divider />
    </TaskBar>
        <VPCWindow />
    </>
  )
}