import { Window, WindowBody, Button, TextBox, Label, Layout } from '../../components'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

import CloudSvg from "../../assets/clouds.svg"

export default function LoginScreen({ onLogin }) {

  const [state, setState] = useComponentState({
    email: '',
    password: '',
    action: 'start',
  })
  const api = useAPI()

  const handleLogin = () => {
    setState({action: 'login'})
    api.login(state.email, state.password, (err) => {
      if(err) return setState({action: 'failure'})
      onLogin()
    })

  }

  const handleCancel = () => {
    setState({action: 'start'})
  }

  var render = null

  switch(state.action) {
  default:
  case 'start':
    render = (<>
    <Layout>
      <Layout style={{ width: '20px'}}>
        <Label title="Email Address:" />
      </Layout>
      <Layout align="left">
        <TextBox style={{ width: '310px' }} value={state.email} onChange={(e, value)=>setState({email: value})}/>
      </Layout>
    </Layout>
    <Layout>
      <Layout style={{ width: '20px'}}>
    <Label title="Password:" />
    </Layout>
      <Layout align="left">
    <TextBox style={{ width: '310px' }} value={state.password} password={true} onChange={(e, value)=>setState({password: value})}/>
    </Layout>
      </Layout>
    <Layout style={{position:'absolute', bottom: '10px', right: '20px'}}>
      <Button onClick={handleLogin} disabled={state.email.length===0 || state.password.length===0}>Login</Button>
    </Layout>
    </>)
    break;
  case 'login':
    render = (<>
    <Layout>
        <Label title="Logging in with your details..." />
      </Layout>
    <Layout style={{position:'absolute', bottom: '10px', right: '20px'}}>
      <Button onClick={handleCancel}>Cancel</Button>
    </Layout>
    </>)
    break;
  case 'failure':
    render = (<>
    <Layout>
        <Label style={{color: 'red'}} title="The email and password you entered were not recognised." />
      </Layout>
    <Layout style={{position:'absolute', bottom: '10px', right: '20px'}}>
      <Button onClick={()=>setState({action:'start', password: ''})}>Try Again</Button>
    </Layout>
    </>)
    break;
  }

  return (
    <Window title="Logon to cloud98" resizeEnabled={false} maximizeVisible={false} minimizeVisible={false} closeVisible={false} width={450} height={240}>
      <div className='login-title'>
          <div className='login-title-inner'>
            <img src={CloudSvg} height="50px" style={{ marginRight:'5px'}} alt="cloud98 Logo"/>
            <div className='smooth' style={{fontFamily: 'Arial', fontSize:'40px', fontWeight: 800}}>cloud</div>
            <div className='smooth' style={{fontFamily: 'Arial', fontSize:'40px'}}>98</div>
         </div>
      </div>
     <div className='login-fade' />
      <WindowBody>
        {render}
      </WindowBody>
    </Window>
  )
}