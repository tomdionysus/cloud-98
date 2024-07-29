import { useUniqueID } from '../hooks'

function Checkbox({ onChange, title, value, checked=false, disabled=false }) {

  const id = useUniqueID("cbx_")
  const onChangeHandler = (e) => onChange && onChange(e, value)

  return (
    <div className="field-row">
      <input disabled={disabled} checked={checked} type="checkbox" id={id} onChange={onChangeHandler}/>
      <label htmlFor={id}>{title}</label>
    </div>
  )
}

export default Checkbox