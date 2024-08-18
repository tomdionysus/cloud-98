import '98.css'

import { AppStateProvider, initAppState } from './components'
import Main from './Main'

initAppState({
  route: 'preflight',
})

function App() {

  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  )
}

export default App;