import '98.css'

import { AppStateProvider, initAppState, Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode, Button, Checkbox, Radiobutton, GroupBox, TextBox, Label } from './components'
import { useComponentState } from './hooks'

initAppState({
  cbValue: 'opt2'
})

function App() {
  const [ state, setState ] = useComponentState({
    cbValue: {},
    rbValue: null,
    rbValue2: null,
  })

  const setCbValue = (comp, value) => {
    state.cbValue[value] = !!!state.cbValue[value]
    setState({ cbValue: state.cbValue })
  }  

  const setRbValue = (comp, value) => setState({ rbValue: value })
  const setRbValue2 = (comp, value) => setState({ rbValue2: value })

  return (
    <AppStateProvider>
    <Window title="Hello World!">
      <WindowBody>
        <TreeView>
          <TreeViewNode title="One"/>
          <TreeViewNode title="Two" open={true}>
            <TreeViewNode title="Alpha"/>
            <TreeViewNode title="Beta"/>
            <TreeViewNode title="Gamma"/>
          </TreeViewNode>
          <TreeViewNode title="Three"/>
        </TreeView>
          <Button>Help Me!</Button>
        <Checkbox title="Option 1" checked={ state.cbValue['opt1'] } value="opt1" onChange={setCbValue} />
        <Checkbox title="Option 2" checked={ state.cbValue['opt2'] } value="opt2" onChange={setCbValue} />
        <Checkbox title="Option 3" checked={ state.cbValue['opt3'] } value="opt3" onChange={setCbValue} />

        <GroupBox title="Options">
          <Radiobutton title="Option A" checked={ state.rbValue2 == 'optA' } value="optA" onChange={setRbValue2} />
          <Radiobutton title="Option B" checked={ state.rbValue2 == 'optB' } value="optB" onChange={setRbValue2} />
          <Radiobutton title="Option C" checked={ state.rbValue2 == 'optC' } value="optC" onChange={setRbValue2} />
        </GroupBox>

        <TextBox label="Name" value={state.tbValue} onChange={(e, value)=>setState({ tbValue: value })}/>

        <Label title={">>: "+state.tbValue} />
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
