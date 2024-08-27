function Button({ children, className, style, onClick, disabled=false }) {
  return (
    <button className={className} style={style} disabled={disabled} onClick={onClick}>
    {children}
    </button>
  )
}

export default Button