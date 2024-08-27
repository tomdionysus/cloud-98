import "./Screen.css"

export default function Screen({ style, children, onBackgroundClick }) {
  const handleClick = (event) => {
      if (event.target === event.currentTarget) {
        onBackgroundClick && onBackgroundClick()
      }
  };

  return (
     <div className='screen' style={style} onClick={handleClick}>
     {children}
     </div>
  )
}