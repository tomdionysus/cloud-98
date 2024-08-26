import React, { useEffect, useRef, useCallback } from 'react';

import "./Menu.css"

function Menu({ style, children, title, onClose, visible=true, onMouseOut, width, height, top, left, bottom, right }) {

  const elementRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
        onClose && onClose()
    }
  }, [ onClose, elementRef])

  useEffect(() => {
    // Delay the attachment of the event so an initial click outside to open this menu does not immediately close it.
    setTimeout(() => { document.addEventListener('click', handleClickOutside) },0)

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, [ visible, handleClickOutside ]);

  if(!visible) return null

  return (
    <div ref={elementRef} className="window menu" style={{ top, left, bottom, right, height, width, ...style }}>
    {children}
    </div>
  )
}

export default Menu