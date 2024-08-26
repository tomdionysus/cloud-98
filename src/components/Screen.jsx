import { useAppEvents } from '../hooks'

import "./Screen.css"

export default function Screen({ style, children }) {

  const events = useAppEvents()

  const handleClick = (event) => {
      if (event.target === event.currentTarget) {
          events.emit('screenclick')
      }
  };

  return (
     <div className='screen' style={style} onClick={handleClick}>
     {children}
     </div>
  )
}