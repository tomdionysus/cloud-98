import { useUniqueID } from '../hooks'

function Radiobutton({ children, onChange, title, value, checked=false, disabled=false }) {

  const id = useUniqueID("rbt_")
  const onChangeHandler = (e) => onChange && onChange(e, value)

  return (
    <div className="field-row">
      <input disabled={disabled} checked={checked} type="radio" id={id} onChange={onChangeHandler}/>
      <label htmlFor={id}>{title}</label>
    </div>
  )
}

export default Radiobutton