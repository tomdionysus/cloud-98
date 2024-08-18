import { Window, TitleBar, WindowBody, StatusBar, StatusBarField, TreeView, TreeViewNode, Button, Checkbox, Radiobutton, GroupBox, TextBox, Label, LoginFade, LoginTitle, Layout } from '../../components'
import { useAppState, useComponentState } from '../../hooks'

import './style.css'

import CloudSvg from "./clouds.svg"

export default function LoginScreen({ onLogin }) {

  const [appState, setAppState] = useAppState()

  return (
    <Window title="Logon to cloud98" resizeEnabled={false} maximizeVisible={false} minimizeVisible={false} closeVisible={false} width={450} height={240}>
        <LoginTitle>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <div style={{width: '300px',  display:'flex', justifyContent:'right'}} className='smooth'>
              <img src={CloudSvg} style={{width:'50px', marginRight:'5px'}}/>
              <p style={{fontFamily: 'Arial', fontSize:'40px', fontWeight: 800}}>cloud</p>
              <p style={{fontFamily: 'Arial', fontSize:'40px'}}>98</p>
            </div>
          </div>
        </LoginTitle>
        <LoginFade />
        <WindowBody>
        <Layout>
         <Layout style={{ width: '20px'}}>
            <Label title="Email Address:" />
          </Layout>
          <Layout align="left">
            <TextBox style={{ width: '310px' }} value={appState.email} onChange={(e, value)=>setAppState({email: value})}/>
          </Layout>
        </Layout>
        <Layout>
          <Layout style={{ width: '20px'}}>
            <Label title="Password:" />
          </Layout>
          <Layout align="left">
            <TextBox style={{ width: '310px' }} password={true} />
          </Layout>
        </Layout>
        <Layout align="right">
          <Button onClick={onLogin}>OK</Button>
          <Button>Cancel</Button>
        </Layout>
        </WindowBody>
    </Window>
  )
}