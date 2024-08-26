import "./MenuItem.css"

import MenuSvg from "../assets/menu.svg"

function MenuItem({ style, title, children, onClick, onMouseOver, onMouseOut }) {

  return (
    <div className="menuitem" style={style} onClick={onClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {title}
      {children ? (
        <>
        <img src={MenuSvg} className="submenu" height="14px" alt={title+" Submenu"} style={{ color: 'inherit' }}/>
        {children}
        </>
      ):null}
    </div>
  )
}

export default MenuItem