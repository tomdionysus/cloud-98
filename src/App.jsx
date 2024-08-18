import '98.css'

import { AppStateProvider, initAppState } from './components'
import Main from './Main'

initAppState({
  route: 'login',
})

function App() {

  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  )
}

export default App;