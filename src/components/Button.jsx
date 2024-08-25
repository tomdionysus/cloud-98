function Button({ children, style, onClick, disabled=false }) {
  return (
    <button style={style} disabled={disabled} onClick={onClick}>
    {children}
    </button>
  )
}

export default Button