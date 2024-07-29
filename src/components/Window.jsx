function Window({ children, style={ width: '300px'}, title="Window Title", maximizeVisible=true, minimizeVisible=true, closeVisible=true, onMinimize, onMaximize, onClose }) {
  return (
    <div className="window" style={style}>
      {children}
    </div>
  )
}

export default Window