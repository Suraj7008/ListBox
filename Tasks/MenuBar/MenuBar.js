document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const menubar = document.getElementById('menubar');
    const currentLink = event.target;
    const parentItem = currentLink.parentNode.parentNode;
    const focusedElement = document.activeElement;
    const isSubMenuOpen = focusedElement.parentElement.classList.contains('submenu');
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
            }
          } else {
            if (isSubMenuOpen) {
                submenuitem.style.display='flex';
                focusedElement.nextElementSibling.querySelector('a').focus();
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
            const Esub = document.querySelectorAll('.menu');
                if (prevItem) {
                    prevLink.focus();
                    Esub[1].setAttribute('aria-expanded', 'false');
                    Esub[2].setAttribute('aria-expanded', 'false');
                    // submenu.style.display = 'none';
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
        }
        break;
      case 'ArrowUp':
        if (!isSubMenuOpen) {
            const previousElement = focusedElement.parentElement.previousElementSibling;
            if (previousElement) {
              previousElement.querySelector('a').focus();
              event.preventDefault();
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
        event.preventDefault();
      }
      break;
    }
  }