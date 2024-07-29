function StatusBar({ children }) {
  return(
    <div style={{ backgroundColor: 'rgb(192, 192, 192)', position:'absolute', bottom:2, left: 2, right: 2, height: 24}}>
      <div className="status-bar" style={{position:'absolute', bottom:2, left: 2, right: 2, height: 18}}>
      {children}
      </div>
    </div>
  )
}

export default StatusBar