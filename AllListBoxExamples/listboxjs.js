
document.addEventListener("DOMContentLoaded", rovingtabindex(), activedescendant(), Multiselectactivedescendant(), Rovingmultiselect())

// Roving TabIndex
function rovingtabindex() {
document.addEventListener("DOMContentLoaded", function() {
  let week = document.querySelectorAll('.week-list [role="option"]');
  week.forEach((day, index) => {
    day.addEventListener("keydown", navigation);
    day.addEventListener("click", setActiveItem);
    day.setAttribute("data-index", index);
  });

  function navigation(e) {
    let target = e.key;
    let currentIndex = parseInt(this.getAttribute("data-index"));
    let nextIndex = (target === "ArrowDown") ? currentIndex + 1 : (target === "ArrowUp") ? currentIndex - 1 : currentIndex;

    if (nextIndex >= 0 && nextIndex < week.length) {
      week[currentIndex].removeAttribute("tabindex");
      week[currentIndex].removeAttribute("aria-selected");

      week[nextIndex].setAttribute("tabindex", "0");
      week[nextIndex].setAttribute("aria-selected", "true");
      week[nextIndex].focus();
    }

    if (target === "ArrowDown" || target === "ArrowUp") {
      e.preventDefault();
    }
  }

  function setActiveItem(e) {
    let clickItem = e.target;
    week.forEach((day) => {
      if (day === clickItem) {
        day.setAttribute("tabindex", "0");
        day.setAttribute("aria-selected", "true");
        day.focus();
      } else {
        day.setAttribute("tabindex", "-1");
        day.setAttribute("aria-selected", "false");
      }
    });
  }
});
}
// aria-activedescendant
function activedescendant() {
let listbox = document.querySelector('.listbox');  
let items = Array.from(listbox.children);
let activeItem = items.find(item => item.getAttribute('aria-selected') === 'true');
listbox.setAttribute('tabindex', '0');

listbox.addEventListener('keydown', e => {
  let currentIndex1 = items.indexOf(activeItem);

  if (e.key === 'ArrowUp' && currentIndex1 > 0) {
    setActiveItem(items[currentIndex1 - 1]);
  }

  if (e.key === 'ArrowDown' && currentIndex1 < items.length - 1) {
    setActiveItem(items[currentIndex1 + 1]);
  }
});

listbox.addEventListener('click', e => {
  let clickedItem = e.target;
  if (clickedItem.classList.contains('listbox-item')) {
    setActiveItem(clickedItem);
  }
});

function setActiveItem(itemA) {
  activeItem.removeAttribute('aria-selected');
  activeItem.setAttribute('tabindex', '-1');
  itemA.setAttribute('aria-selected', 'true');
  itemA.removeAttribute('tabindex');
  listbox.setAttribute('aria-activedescendant', itemA.id);
  activeItem = itemA;
}
}
// Multiselect
function Multiselectactivedescendant() {
    let multiselectedlistbox = document.querySelector('.listboxM');
    let multiselecteditems = Array.from(multiselectedlistbox.children);
  
    multiselectedlistbox.setAttribute('role', 'listbox');
    multiselectedlistbox.setAttribute('tabindex', '0');
    multiselectedlistbox.setAttribute('aria-labelledby', 'listbox-label');
  
    multiselectedlistbox.addEventListener('keydown', e => {
      let currentIndexM = multiselecteditems.findIndex(itemM => itemM === document.activeElement);
  
      if (e.key === 'ArrowUp' && currentIndexM > 0) {
        e.preventDefault(); // Prevents scrolling the page
        multiselecteditems[currentIndexM - 1].focus();
      }
  
      if (e.key === 'ArrowDown' && currentIndexM < multiselecteditems.length - 1) {
        e.preventDefault(); // Prevents scrolling the page
        multiselecteditems[currentIndexM + 1].focus();
      }
  
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); // Prevents submitting forms, if any
        toggleSelection(document.activeElement);
      }
    });
  
    multiselectedlistbox.addEventListener('click', e => {
      let clickedItemM = e.target;
      if (clickedItemM.classList.contains('listbox-itemM')) {
        toggleSelection(clickedItemM);
      }
    });
  
    function toggleSelection(itemM) {
      let isSelected = itemM.getAttribute('aria-selected') === 'true';
      if (isSelected) {
        itemM.setAttribute('aria-selected', 'false');
        itemM.setAttribute('tabindex', '-1');
      } else {
        itemM.setAttribute('aria-selected', 'true');
        itemM.setAttribute('tabindex', '0');
      }
    }
  }
  
// Roving multiselect
function Rovingmultiselect() {
    let selectedOptions = [];
    let selectedOptionsContainer = document.querySelector(".week-listRM");
  
    selectedOptionsContainer.addEventListener('keydown', e => {
      let targetRM = e.target;
      let key = e.key;
  
      if (key === "ArrowUp" || key === "ArrowDown") {
        e.preventDefault(); // Prevents scrolling the page
        navigateListbox(key);
      } else if (key === " ") {
        e.preventDefault(); // Prevents submitting forms, if any
        toggleOptionSelection(targetRM);
      }
    });
  
    function navigateListbox(key) {
      let options = document.querySelectorAll('[role="option"]');
      let currentIndexRM = Array.prototype.indexOf.call(options, document.activeElement);
  
      if (key === "ArrowUp" && currentIndexRM > 0) {
        options[currentIndexRM - 1].focus();
      } else if (key === "ArrowDown" && currentIndexRM < options.length - 1) {
        options[currentIndexRM + 1].focus();
      }
    }
  
    function toggleOptionSelection(option) {
      let isSelectedRM = option.getAttribute("aria-selected") === "true";
  
      if (isSelectedRM) {
        option.setAttribute("aria-selected", "false");
        option.classList.remove("selected");
        selectedOptions.splice(selectedOptions.indexOf(option), 1);
      } else {
        option.setAttribute("aria-selected", "true");
        option.classList.add("selected");
        selectedOptions.push(option);
      }
    }
  
    selectedOptionsContainer.addEventListener('click', e => {
      let targetHRM = e.target;
  
      if (targetHRM.getAttribute("role") === "option") {
        toggleOptionSelection(targetHRM);
      }
    });
  }
  