function toggleSubmenu(event) {
    event.preventDefault();
    event.stopPropagation();

    // Find the corresponding submenu
    var submenu = event.target.nextElementSibling;

    // Toggle the display of the submenu
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}

// Attach click event handlers to the menu items with submenus
var menuItems = document.querySelectorAll('a[aria-haspopup="true"]');
menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', toggleSubmenu);
});