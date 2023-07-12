document.addEventListener('keydown', handleNavigation);
document.addEventListener('keydown', handleSubmenuNavigation);
document.addEventListener('keydown', closeSubmenus);

// Function to handle keyboard navigation
function handleNavigation(event) {
  const currentMenuItem = event.target;
  const parentMenuItem = currentMenuItem.closest('[role="none"]');
  const siblingMenuItems = Array.from(parentMenuItem.parentElement.children);
  const currentIndex = siblingMenuItems.indexOf(parentMenuItem);

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      if (currentIndex > 0) {
        siblingMenuItems[currentIndex - 1].querySelector('.menu').focus();
      }
      break;

    case 'ArrowRight':
      event.preventDefault();
      if (currentIndex < siblingMenuItems.length - 1) {
        siblingMenuItems[currentIndex + 1].querySelector('.menu').focus();
        event.stopPropagation();
      }
      break;

    case 'ArrowDown':
      const submenu = parentMenuItem.querySelector('.submenu');
      const submenuLinks = submenu.querySelectorAll('a');
      if (submenu && submenuLinks.length > 0) {
        event.preventDefault();
        submenu.style.display = 'block';
        submenuLinks[0].focus();
        currentMenuItem.setAttribute('aria-expanded', 'true');
      }
      break;

    case 'ArrowUp':
      const Usubmenu = parentMenuItem.querySelector('.submenu');
      if (Usubmenu && Usubmenu.style.display !== 'block') {
        event.preventDefault();
        Usubmenu.style.display = 'block';
        document.querySelector('.submenu1').focus();
        document.querySelector('.submenu2').focus();
      }
      break;

    case 'Escape':
      event.preventDefault();
    //   closeSubmenus();
      const parentItem = parentMenuItem.previousElementSibling;
      const submenuitem = parentMenuItem.querySelector('.submenuitem');
      if (parentItem) {
        parentItem.querySelector('.menu').focus();
        parentItem.querySelector('.menu').setAttribute('aria-expanded', 'false');
      }
      if (submenuitem) {
        submenuitem.style.display = 'none';
      }
      break;
  }
}

// Function to handle submenu navigation
function handleSubmenuNavigation(event) {
  const currentLink = event.target;
  const parentItem = currentLink.parentNode.parentNode;
  const submenu = parentItem.querySelector('.submenu');
  const submenuItems = submenu.querySelectorAll('a');
  const submenuitem = parentItem.querySelector('.submenuitem');

  switch (event.key) {
    case 'ArrowDown':
      if (submenuItems.length > 0) {
        const currentIndex = Array.from(submenuItems).indexOf(currentLink);
        const nextIndex = (currentIndex + 1) % submenuItems.length;
        const nextLink = submenuItems[nextIndex];
        nextLink.focus();
        submenuItems.forEach(item => item.setAttribute('tabindex', '-1'));
        nextLink.setAttribute('tabindex', '0');
        submenuitem.style.display = 'none';
      }
      break;

    case 'ArrowUp':
      const nextLink = currentLink.nextElementSibling;
      const prevLink = currentLink.previousElementSibling;
      if (prevLink) {
        prevLink.focus();
        prevLink.setAttribute('tabindex', '0');
        currentLink.setAttribute('tabindex', '-1');
        nextLink.setAttribute('tabindex', '-1');
      } else {
        document.querySelector('.submenu1').focus();
        document.querySelector('.submenu2').focus();
        document.querySelector('.submenuitem2').focus();
        event.stopPropagation();
      }
      break;

    case 'ArrowRight':
      event.preventDefault();
      
      const subsubmenuItems = submenuitem.querySelectorAll('a');
       if (subsubmenuItems.length > 0) {
        submenuitem.style.display = 'flex';
        subsubmenuItems[0].focus();
        subsubmenuItems.forEach(item => item.setAttribute('tabindex', '-1'));
        subsubmenuItems[0].setAttribute('tabindex', '0');
      }
      else {
        const submenu = parentMenuItem.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'none';
          currentMenuItem.setAttribute('aria-expanded', 'false');
        }
      }
      break;

    case 'ArrowLeft':
      const prevItem = parentItem.previousElementSibling;
      if (prevItem) {
        const prevLink = prevItem.querySelector('a');
        const Esub = document.querySelectorAll('.menu');
        prevLink.focus();
        Esub[1].setAttribute('aria-expanded', 'false');
        Esub[2].setAttribute('aria-expanded', 'false');
        submenu.style.display = 'none';
      }
      break;
  }
}

function closeSubmenus(event) {
    if (event.key === 'Escape') {
      const submenu = document.querySelectorAll('.submenu');
      const subitem = document.querySelectorAll('.submenuitem');
  
      submenu.forEach((submenu) => {
        if (submenu.style.display === 'block') {
          submenu.style.display = 'none';
        }
      });
  
      subitem.forEach((subitem) => {
        if (subitem.style.display === 'flex') {
          subitem.style.display = 'none';
        }
      });
    }
  }
  

// Attach event listeners to submenu items
const submenuItems = document.querySelectorAll('.submenu a');
submenuItems.forEach(item => {
  item.addEventListener('keydown', handleSubmenuNavigation);
});

// Attach event listeners to menu items
const menuItems = document.querySelectorAll('.menubar a');
menuItems.forEach(item => {
  item.addEventListener('keydown', handleNavigation);
});

const subitem = document.querySelectorAll('.submenuitem a');
subitem.forEach(item => {
  item.addEventListener('keydown', handleSubmenuNavigation);
});
