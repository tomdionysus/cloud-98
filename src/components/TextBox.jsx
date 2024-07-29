import { useUniqueID } from '../hooks'
import { useRef } from 'react'

function TextBox({ label, value, onChange }) {

  const id = useUniqueID('tbx_')
  const inputRef = useRef()

  const handleChange = (e) => onChange && onChange(e, inputRef.current.value)

  return (
    <div className="field-row">
      <label htmlFor={id}>{label}</label>
      <input ref={inputRef} id={id} type="text" defaultValue={value} onChange={handleChange} />
    </div>
  )
}

export default TextBox