function TreeViewNode({ children, title, open }) {

  if(children && children.length && children.length>0) {
    return (
      <details open={open ? true : undefined}>
        <summary>{title}</summary>
        <ul>
         {children}
        </ul>
      </details>
    )
  } else {

    return (
      <li class="tree-view">
      {title}
      </li>
    )
  }
}

export default TreeViewNode