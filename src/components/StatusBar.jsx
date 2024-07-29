function StatusBar({ children }) {
  return(
    <div className="status-bar" style={{position:'absolute', bottom:4, left: 4, right: 4, height: 16}}>
    {children}
    </div>
  )
}

export default StatusBar