import { useUniqueID } from '../hooks'
import { useRef } from 'react'

function TextBox({ style, label, value, password, onChange }) {

  const id = useUniqueID('tbx_')
  const inputRef = useRef()

  const handleChange = (e) => onChange && onChange(e, inputRef.current.value)

  return (
    <div className="field-row"s>
      <label htmlFor={id}>{label}</label>
      <input style={style} ref={inputRef} id={id} type={password ? "password":"text"} defaultValue={value} onChange={handleChange} />
    </div>
  )
}

export default TextBox