export default function dealNavList(parentNode: HTMLUListElement) {
  const childList = ([...parentNode.children] as Array<HTMLLIElement>).filter(item => item.dataset['index'] !== undefined);
  const selectChild = childList.map(({ children }) => {
    let curChild:HTMLDivElement;
    [...children].forEach(child => {
      if(child.tagName === 'DIV') {
        curChild = child as HTMLDivElement   
      }
    })
    return curChild
  });
  childList.forEach((child,index) => {
    child.addEventListener('mouseenter', () => {
      selectChild.forEach((item) => {
        (item as any).style.display = 'none'
      })
      selectChild[index].style.display = 'block'
      child.addEventListener('mouseleave',() => {
        selectChild[index].style.display = 'none'
      })
    })
  })
}