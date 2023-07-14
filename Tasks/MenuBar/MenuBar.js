document.addEventListener('keydown', handleKeyDown);

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
    const sub = document.querySelectorAll(".submenu");
    switch (event.key) {
      case 'ArrowRight':
        if (!isSubMenuOpen) {
            nextElement = focusedElement.parentElement.nextElementSibling;
            if (nextElement) {
              nextElement.querySelector('a').focus();
            //   sub[1].setAttributeAttribute('aria-expanden','true');
            //   sub[2].setAttributeAttribute('aria-expanden','true');
              event.preventDefault();
              event.stopPropagation();
            }
          } else if (isSubMenuOpen && focusedElement.nextElementSibling.classList.contains('submenuitem')) {
                submenuitem.style.display='flex';
                focusedElement.nextElementSibling.querySelector('a').focus();
                event.preventDefault();
                event.stopPropagation();
              } else {
                const nextItem = parentItem.nextElementSibling;
                const NextLink = nextItem.querySelector('a');
                  if (NextLink) {
                    NextLink.focus();
                      // prevLink.setAttribute('aria-expanded','false');
                      submenu.classList.remove('open');
                      event.preventDefault();
                  }
              }
          
        break;
      case 'ArrowLeft':
        if (!isSubMenuOpen) {
          const previousElement = focusedElement.parentElement.previousElementSibling;
          if (previousElement) {
            previousElement.querySelector('a').focus();
            event.preventDefault();
          }
        } else {
            const prevItem = parentItem.previousElementSibling;
            const prevLink = prevItem.querySelector('a');
                if (prevItem) {
                    prevLink.focus();
                    // prevLink.setAttribute('aria-expanded','false');
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
          }
        } else {
          const submenu = focusedElement.nextElementSibling;
          if (submenu && submenu.classList.contains('submenu')) {
            submenu.classList.add('open');
            submenu.querySelector('a').focus();
            event.preventDefault();
          }
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
              event.preventDefault();
            }
          }
        break;

        case 'Escape':
      if (isSubMenuOpen) {
        submenu.classList.remove('open');
        submenu.previousElementSibling.focus();
        // submenu.previousElementSibling.setAttribute("aria-expanded","false")
        event.preventDefault();
        event.stopPropagation();
      } else {
        if (isSubSubMenuOpen) {
            // submenuitem.classList.remove('open');
            submenuitem.previousElementSibling.focus();
            submenuitem.style.display='none';
            event.preventDefault();
            event.stopPropagation();
        }
      }
      break;
    }
  }