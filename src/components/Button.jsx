function Button({ children, onClick, disabled=false }) {
  return (
    <button disabled={disabled} onClick={onClick}>
    {children}
    </button>
  )
}

export default Button