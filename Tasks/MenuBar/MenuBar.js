document.addEventListener('keydown', handleNavigation, handleSubmenuNavigation);

    // Function to handle keyboard navigation
    function handleNavigation(event) {
    const currentMenuItem = event.target;
    const parentMenuItem = currentMenuItem.parentElement;
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
            const sub = document.querySelectorAll('.menu');
                if (submenu) {
                    event.preventDefault();
                    submenu.style.display = 'block';
                    const submenuLinks = submenu.querySelectorAll('a');
                    if (submenuLinks.length > 0) {
                        submenu.style.display = 'block';
                        submenuLinks[0].focus();
                        currentMenuItem.setAttribute('aria-expanded','true');
                        sub[0].setAttribute('tabindex','-1');
                    }
                }
        break;

        case 'ArrowUp':
            const Usubmenu = parentMenuItem.querySelector('.submenu');
                if (Usubmenu && Usubmenu.style.display !== 'block') {
                    event.preventDefault();
                    Usubmenu.style.display = 'block';
                    const submenuLinks = Usubmenu.querySelectorAll('a');
                    if (submenuLinks.length > 0) {
                        document.querySelector('.submenu1').focus();
                        document.querySelector('.submenu2').focus();
                        
                    } 
                }
        break;

        case 'Escape':
            event.preventDefault();      
            // closeSubmenus();
                const parentItem = parentMenuItem.previousElementSibling;
                const Esub = document.querySelectorAll('.menu');
                const mSub = document.querySelectorAll('.submenu');
                const currentLink = event.target;   
                const SparentItem = currentLink.parentNode.parentNode;
                const submenuitem = SparentItem.querySelector('.submenuitem');

                    if (parentItem) {
                        parentItem.focus();
                        Esub[1].setAttribute('aria-expanded','false');
                        Esub[2].setAttribute('aria-expanded','false');
                    }
                    
                    if (SparentItem) {
                        submenuitem.style.display = 'none';
                    }
        break;
    }
}

// Function to handle submenu navigation
function handleSubmenuNavigation(event) {
    const key = event.key;
    const currentLink = event.target;
    const parentItem = currentLink.parentNode.parentNode;
    const submenu = parentItem.querySelector('.submenu');
    const submenuItems = submenu.querySelectorAll('a');
    const submenuitem = parentItem.querySelector('.submenuitem');
    
    switch (event.key) {
        case 'ArrowDown':
            if (key === 'ArrowDown') {
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
            if (key === 'ArrowUp') {
                const nextLink = currentLink.nextElementSibling;
                const prevLink = currentLink.previousElementSibling;
                    if (prevLink) {
                        prevLink.focus();
                        prevLink.setAttribute('tabindex','0');
                        currentLink.setAttribute('tab index','-1');
                        nextLink.setAttribute('tabindex','-1');
                    } else {
                          document.querySelector('.submenu1').focus();
                          document.querySelector('.submenu2').focus();
                          document.querySelector('.submenuitem2').focus();
                          event.stopPropagation();
                    }
            }
        break;

        case 'ArrowRight':
            if (key === 'ArrowRight') {
                event.preventDefault();
                
                const subsubmenuItems = submenuitem.querySelectorAll('a');
                if (subsubmenuItems.length > 0) {
                    submenuitem.style.display = 'flex';
                    subsubmenuItems[0].focus();
                    subsubmenuItems.forEach(item => item.setAttribute('tabindex', '-1'));
                    subsubmenuItems[0].setAttribute('tabindex', '0');
                }
                
            }
        break;

        case 'ArrowLeft':
            if (key === 'ArrowLeft') {
                const prevItem = parentItem.previousElementSibling;
                const prevLink = prevItem.querySelector('a');
                const Esub = document.querySelectorAll('.menu');
                    if (prevItem) {
                        prevLink.focus();
                        Esub[1].setAttribute('aria-expanded', 'false');
                        Esub[2].setAttribute('aria-expanded', 'false');
                        submenu.style.display = 'none';
                    }
            }
        break;
    }
}



    function closeSubmenus(event) {
      const submenu = document.querySelectorAll('.submenu');

      submenu.forEach ((submenu) =>{
        submenu.style.display='none';
      });   
    }

    // Attach event listeners to submenu items
    const submenuItems = document.querySelectorAll('.submenu a');
        submenuItems.forEach((item) => {
          item.addEventListener('keydown', handleSubmenuNavigation);
        });
    
    // Attach event listeners to menu items
    const menuItems = document.querySelectorAll('.menubar a');
        menuItems.forEach((item) => {
          item.addEventListener('keydown', handleNavigation);
        });

    const subitem = document.querySelectorAll('.submenuitem a');
        subitem.forEach((item) => {
          item.addEventListener('keydown', handleSubmenuNavigation);
        });