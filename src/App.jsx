import '98.css'

import { AppStateProvider, initAppState, Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode } from './components'

initAppState({})

function App() {
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
      </WindowBody>
      <StatusBar>
        <StatusBarField>Press F1 for help</StatusBarField>
        <StatusBarField>Slide</StatusBarField>
      </StatusBar>
    </Window>

     <Window title="Hello World 2!">
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
