import '98.css'

import { AppStateProvider, initAppState, Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode, Button, Checkbox, Radiobutton, GroupBox, TextBox, Label, LoginFade, LoginTitle, Layout } from './components'
import { LoginScreen } from './screens'
import { useComponentState, useAppState } from './hooks'

export default function Main() {
  const [ state, setState ] = useComponentState({
    cbValue: {},
    rbValue: null,
    rbValue2: null,
  })

  const [appState, setAppState] = useAppState()

  const setCbValue = (comp, value) => {
    state.cbValue[value] = !!!state.cbValue[value]
    setState({ cbValue: state.cbValue })
  }  


  const setRbValue = (comp, value) => setState({ rbValue: value })
  const setRbValue2 = (comp, value) => setState({ rbValue2: value })

  switch(appState.route) {
    case 'login': return <LoginScreen onLogin={()=>setAppState({route: 'home'})} />
  }
}