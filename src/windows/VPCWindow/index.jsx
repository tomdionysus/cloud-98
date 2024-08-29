import { useEffect } from 'react'
import { Window, WindowBody, TreeView, TreeViewNode, Label, SplitPane } from '../../components'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

export default function VPCWindow(props) {

  const [state, setState] = useComponentState({
    vpcs: [],
    action: 'start',
  })

  const api = useAPI()

  useEffect(()=>{
    if(state.action==='start') {
      api.getVPC((err, vpcs)=>{
        if(err) return // TODO: Handle API Errors
        setState({vpcs, action:'display'})
      })
      setState({action: 'loading'})
      state.action = null
    }
  })

  var render = null

  if(state.action==='display') {
    render = []
    for(let i=0; i< state.vpcs.length; i++) {
      let vpc = state.vpcs[i]
      render.push(
        <TreeViewNode key={"vpc_"+vpc.id} title={vpc.name} />
      )
    }
  }

  return (
    <Window title='Virtual Private Clouds (VPCs)' {...props}>
      {state.action==='display' ? (
        <SplitPane minLeft={100} left={
          <TreeView>{render}</TreeView>
        } right={
          <Label title="Right" />
        } />
      ):null}
    </Window>
  )
}