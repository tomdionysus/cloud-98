import '98.css'

import { useEffect } from 'react'
import { AppStateProvider, initAppState, Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode, Button, Checkbox, Radiobutton, GroupBox, TextBox, Label, LoginFade, LoginTitle, Layout } from './components'
import { LoginScreen, HomeScreen } from './screens'
import { useComponentState, useAppState, useAPI } from './hooks'

export default function Main() {
  const [appState, setAppState] = useAppState()
  const api = useAPI()

  useEffect(()=>{
    if(appState.route==='preflight') {
      if (api.hasSession()) {
        api.getSession((err, session) => {
          if(err) return setAppState({route: 'login'})
          setAppState({route: 'home'})
        })
      } else{
        setAppState({route: 'login'})
      }
    }
  })

  switch(appState.route) {
    case 'login': return <LoginScreen onLogin={()=>setAppState({route: 'home'})} />
    case 'home': return <HomeScreen onLogout={()=>setAppState({route: 'login'})} />
    default: return null
  }
}