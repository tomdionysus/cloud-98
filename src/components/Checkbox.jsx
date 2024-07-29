function Checkbox({ children, onChange, title, value, checked=false, disabled=false }) {

  const onChangeHandler = (e) => onChange && onChange(e, value)

  return (
    <div className="field-row">
      <input disabled={disabled} checked={checked} type="checkbox" id={"cbx_"+value} onChange={onChangeHandler}/>
      <label htmlFor={"cbx_"+value}>{title}</label>
    </div>
  )
}

export default Checkbox