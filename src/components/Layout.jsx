function Layout({ children, style, direction, spacing, align }) {

  const lStyle = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: direction || 'horizontal',
    justifyContent: align || "left",
    gap: spacing || "4px",
    marginTop: "4px",
    marginBottom: "4px",
    ...style,
  }

  return (
     <div style={lStyle}>
     {children}
     </div>
  )
}

export default Layout