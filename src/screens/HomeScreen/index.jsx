import { Window, WindowBody, Button, TextBox, Label, Layout, TaskBar } from '../../components'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

export default function HomeScreen({ onLogout }) {

  const [state, setState] = useComponentState({
    email: '',
    password: '',
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
    </TaskBar>
    </>
  )
}