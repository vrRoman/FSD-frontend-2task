function list(dropdownElems, popupSelector, titleSelector, classNameToToggle) {
  const activeLists = [];
  const handlerWindowClick = (evt) => {
    for (let i = 0; i < dropdownElems.length; i += 1) {
      const elem = dropdownElems[i];
      const inputs = elem.querySelectorAll(titleSelector);

      if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1])) {
        if (!activeLists.includes(elem)) {
          activeLists.push(elem);
        }
      }
    }
    for (let i = 0; i < activeLists.length; i += 1) {
      const elem = activeLists[i];
      const inputs = elem.querySelectorAll(titleSelector);
      const popup = elem.querySelector(popupSelector);

      if (evt.composedPath().includes(popup)) return;

      if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1])) {
        elem.classList.toggle(classNameToToggle);
      } else {
        elem.classList.remove(classNameToToggle);
      }
    }
  };

  window.addEventListener('click', handlerWindowClick);
}

list($('.list'), '.list__checkboxes', '.list__title', 'list_expanded');
