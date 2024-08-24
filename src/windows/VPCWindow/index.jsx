import { useEffect } from 'react'
import { Window, WindowBody, Button, TreeView, TreeViewNode, Label, Layout, TaskBar } from '../../components'
import { useComponentState, useAPI } from '../../hooks'

import './style.css'

export default function VPCWindow({ onClose }) {

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
    <Window title='Virtual Private Clouds (VPCs)' onClose={onClose} width={450} height={240}>
      <WindowBody>
      {state.action==='display' ? (
        <>
        <TreeView>{render}</TreeView>
        </>
      ):null}
      </WindowBody>
    </Window>
  )
}