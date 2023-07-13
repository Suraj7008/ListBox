document.addEventListener('keydown', handleKeyDown);
// document.addEventListener('keydown', handlesubmenu);

function handleKeyDown(event) {
    const menubar = document.getElementById('menubar');
    const currentLink = event.target;
    const parentItem = currentLink.parentNode.parentNode;
    const focusedElement = document.activeElement;
    const isSubMenuOpen = focusedElement.parentElement.classList.contains('submenu');
    const isSubSubMenuOpen = focusedElement.parentElement.classList.contains('submenuitem');
    let nextElement;
    const submenu = parentItem.querySelector('.submenu');
  const submenuitem = parentItem.querySelector('.submenuitem')
    switch (event.key) {
      case 'ArrowRight':
        if (!isSubMenuOpen) {
            nextElement = focusedElement.parentElement.nextElementSibling;
            if (nextElement) {
              nextElement.querySelector('a').focus();
              event.preventDefault();
              event.stopPropagation();
            }
          } else {
            if (isSubMenuOpen) {
                submenuitem.style.display='flex';
                focusedElement.nextElementSibling.querySelector('a').focus();
                event.preventDefault();
                event.stopPropagation();
              }
          }
        break;
      case 'ArrowLeft':
        if (!isSubMenuOpen) {
          const previousElement = focusedElement.parentElement.previousElementSibling;
          if (previousElement) {
            previousElement.querySelector('a').focus();
            event.preventDefault();
            // event.stopPropagation();
          }
        } else {
            const prevItem = parentItem.previousElementSibling;
            const prevLink = prevItem.querySelector('a');
                if (prevItem) {
                    prevLink.focus();
                    submenu.classList.remove('open');
                    event.preventDefault();
                }
    }
        break;
      case 'ArrowDown':
        if (isSubMenuOpen) {
          nextElement = focusedElement.nextElementSibling;
          if (nextElement) {
            nextElement.focus();
            event.preventDefault();
            // event.stopPropagation();
          }
        } else {
          const submenu = focusedElement.nextElementSibling;
          if (submenu && submenu.classList.contains('submenu')) {
            submenu.classList.add('open');
            submenu.querySelector('a').focus();
            event.preventDefault();
            // event.stopPropagation();
          } // else contion to br added
          else {
            const newElement = focusedElement.nextElementSibling;
            if (newElement){
                newElement.focus();
            }
          }
        }
        break;
      case 'ArrowUp':
        if (!isSubMenuOpen) {
            const previousElement = focusedElement.previousElementSibling;
            if (previousElement) {
              previousElement.focus();
              event.preventDefault();
              event.stopPropagation();
            }
          } else {
            const previousElement = focusedElement.previousElementSibling;
            if (previousElement) {
              previousElement.focus();
            //   event.preventDefault();
            //   event.stopPropagation();
            }
          }
        break;

        case 'Escape':
      if (isSubMenuOpen) {
        submenu.classList.remove('open');
        submenu.previousElementSibling.focus();
        console.log(submenu.previousElementSibling);
        event.preventDefault();
        event.stopPropagation();
      } else {
        if (isSubSubMenuOpen) {
            submenuitem.classList.remove('open');
            submenuitem.previousElementSibling.focus();
            console.log(submenuitem.previousElementSibling);
        }
      }
      break;
    }
  }