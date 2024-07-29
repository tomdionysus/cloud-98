import '98.css'

import { AppStateProvider, initAppState, Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode, Button, Checkbox } from './components'
import { useComponentState } from './hooks'

initAppState({
  cbValue: 'opt2'
})

function App() {
  const [ state, setState ] = useComponentState({
    cbValue: {}
  })

  const setCbValue = (comp, value) => {
    state.cbValue[value] = !!!state.cbValue[value]
    setState({ cbValue: state.cbValue })
  }  

  return (
    <AppStateProvider>
    <Window title="Hello World!">
      <WindowBody>
        <TreeView>
          <TreeViewNode title="One"/>
          <TreeViewNode title="Two" open={true}>
            <TreeViewNode title="Two.One"/>
            <TreeViewNode title="Two.Two"/>
          </TreeViewNode>
          <TreeViewNode title="Three"/>
        </TreeView>
        <Button>Help Me!</Button>
        <Checkbox title="Option 1" checked={ state.cbValue['opt1'] } value="opt1" onChange={setCbValue} />
        <Checkbox title="Option 2" checked={ state.cbValue['opt2'] } value="opt2" onChange={setCbValue} />
        <Checkbox title="Option 3" checked={ state.cbValue['opt3'] } value="opt3" onChange={setCbValue} />
      </WindowBody>
      <StatusBar>
        <StatusBarField>Press F1 for help</StatusBarField>
        <StatusBarField>Slide</StatusBarField>
      </StatusBar>
    </Window>

     <Window title="Hello World 2!" left={800}>
      <WindowBody>
        <TreeView>
          <TreeViewNode title="One"/>
          <TreeViewNode title="Two" open={true}>
            <TreeViewNode title="Two.One"/>
            <TreeViewNode title="Two.Two"/>
          </TreeViewNode>
          <TreeViewNode title="Three"/>
        </TreeView>
      </WindowBody>
      <StatusBar>
        <StatusBarField>Press F1 for help</StatusBarField>
        <StatusBarField>Slide</StatusBarField>
      </StatusBar>
    </Window>
    </AppStateProvider>
  )
}

export default App;
