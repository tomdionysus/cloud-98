import '98.css'

import { Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode } from './components'

function App() {
  return (
    <Window>
      <TitleBar title="Hello World!"/>
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
  )
}

export default App;
