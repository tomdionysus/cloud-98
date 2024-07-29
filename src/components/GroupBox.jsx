function GroupBox({ children, title }) {

  return (
    <fieldset>
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}

export default GroupBox