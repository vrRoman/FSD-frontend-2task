const dropdownInit = ({
  dropdownElems, popupSelector, inputSelector, classNameToToggle, applyBtnSelector,
}) => {
  const activeDropdowns = [];
  const handleWindowClick = (evt) => {
    for (let i = 0; i < dropdownElems.length; i += 1) {
      const elem = dropdownElems[i];
      const inputs = elem.querySelectorAll(inputSelector);

      if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1])) {
        if (!activeDropdowns.includes(elem)) {
          activeDropdowns.push(elem);
        }
      }
    }

    for (let i = 0; i < activeDropdowns.length; i += 1) {
      const elem = activeDropdowns[i];
      const inputs = elem.querySelectorAll(inputSelector);
      const popup = elem.querySelector(popupSelector);

      if (evt.composedPath().includes(popup)) return;

      if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1])) {
        elem.classList.toggle(classNameToToggle);
      } else {
        elem.classList.remove(classNameToToggle);
      }
    }
  };

  window.addEventListener('click', handleWindowClick);

  if (applyBtnSelector) {
    for (let i = 0; i < dropdownElems.length; i += 1) {
      const elem = dropdownElems[i];
      const applyBtn = elem.querySelector(applyBtnSelector);

      applyBtn.onclick = () => {
        elem.classList.remove(classNameToToggle);
      };
    }
  }
};

const changeValue = (newValue, textElem, valueElem, fullText, maxLength = 27) => {
  let text = fullText;
  const input = textElem;
  const value = valueElem;

  if (fullText.length > maxLength) {
    text = (`${fullText.slice(0, maxLength)}...`).toLowerCase();
  }

  input.innerText = text;
  value.innerText = newValue;
};

const countedItems = ({
  dropdownElems,
  textSelector = '.dropdown__text',
  itemSelector = '.items-popup__item',
  addBtnSelector = '.items-popup__add-value',
  removeBtnSelector = '.items-popup__remove-value',
  nameSelector = '.items-popup__title',
  valueSelector = '.items-popup__value h3',
  clearBtnSelector = '.items-popup__clear',
  clearBtnDisabledClass = 'items-popup__clear_disabled',
  inactiveBtnClass = 'items-popup__change-value_inactive',
  defaultElemText = false,
  maxLength = 27,
}) => {
  for (let i = 0; i < dropdownElems.length; i += 1) {
    const dropdown = dropdownElems[i];

    const textElem = dropdown.querySelector(textSelector);
    const items = dropdown.querySelectorAll(itemSelector);
    const defaultText = defaultElemText || textElem.innerText;

    const clearBtn = dropdown.querySelector(clearBtnSelector);

    const itemsInfo = [];

    let counter = 0;
    for (let n = 0; n < items.length; n += 1) {
      const item = items[n];

      const addBtn = item.querySelector(addBtnSelector);
      const removeBtn = item.querySelector(removeBtnSelector);
      const nameElem = item.querySelector(nameSelector);
      const valueElem = item.querySelector(valueSelector);

      const itemNum = counter;

      itemsInfo.push({
        name: nameElem.innerText.toLowerCase(),
        value: Number(valueElem.innerText),
      });

      let sumOfValues = 0;
      for (let x = 0; x <= itemsInfo.length - 1; x += 1) {
        sumOfValues += itemsInfo[x].value;
      }
      if (sumOfValues === 0) {
        clearBtn.classList.add(clearBtnDisabledClass);
      }

      if (itemsInfo[itemNum].value === 0) {
        if (inactiveBtnClass) removeBtn.classList.add(inactiveBtnClass);
      }

      addBtn.onclick = () => {
        if (itemsInfo[itemNum].value >= 0) {
          if (inactiveBtnClass) removeBtn.classList.remove(inactiveBtnClass);
        }

        itemsInfo[itemNum].value += 1;

        let fullText = '';
        for (let a = 0; a < itemsInfo.length; a += 1) {
          const itemInfo = itemsInfo[a];
          if (itemInfo.value !== 0) {
            fullText += `${itemInfo.value} ${itemInfo.name}, `;
          }
        }

        fullText = fullText.slice(0, -2);

        if (fullText === '') {
          fullText = defaultText;
        }

        changeValue(
          itemsInfo[itemNum].value, textElem, valueElem, fullText.toLowerCase(), maxLength,
        );

        clearBtn.classList.remove(clearBtnDisabledClass);
      };
      removeBtn.onclick = () => {
        if (itemsInfo[itemNum].value === 0) return;

        if (itemsInfo[itemNum].value === 1) {
          if (inactiveBtnClass) removeBtn.classList.add(inactiveBtnClass);
        }

        itemsInfo[itemNum].value -= 1;

        let fullText = '';
        for (let a = 0; a < itemsInfo.length; a += 1) {
          const itemInfo = itemsInfo[a];
          if (itemInfo.value !== 0) {
            fullText += `${itemInfo.value} ${itemInfo.name}, `;
          }
        }
        fullText = fullText.slice(0, -2);

        if (fullText === '') {
          fullText = defaultText;
        }

        changeValue(itemsInfo[itemNum].value, textElem, valueElem, fullText, maxLength);

        sumOfValues = 0;
        for (let a = 0; a <= itemsInfo.length - 1; a += 1) {
          sumOfValues += itemsInfo[a].value;
        }
        if (sumOfValues === 0) {
          clearBtn.classList.add(clearBtnDisabledClass);
        }
      };

      counter += 1;
    }

    clearBtn.onclick = () => {
      counter = 0;
      for (let n = 0; n < items.length; n += 1) {
        const item = items[n];

        const itemNum = counter;
        const removeBtn = item.querySelector(removeBtnSelector);
        const valueElem = item.querySelector(valueSelector);

        itemsInfo[itemNum].value = 0;

        if (inactiveBtnClass) {
          removeBtn.classList.add(inactiveBtnClass);
        }

        changeValue(itemsInfo[itemNum].value, textElem, valueElem, defaultText, maxLength);

        counter += 1;
      }

      clearBtn.classList.add(clearBtnDisabledClass);
    };
  }
};

$(document).ready(() => {
  dropdownInit({
    dropdownElems: $('.js-dropdown'),
    popupSelector: '.dropdown__popup',
    inputSelector: '.dropdown__input',
    applyBtnSelector: '.items-popup__confirm',
    classNameToToggle: 'dropdown_expanded',
  });
  countedItems({
    dropdownElems: $('.js-dropdown.dropdown_facilities'),
  });
  countedItems({
    dropdownElems: $('.js-dropdown:not(.dropdown_facilities)'),
    defaultElemText: 'Сколько гостей',
  });

  dropdownInit({
    dropdownElems: $('.js-date-picker'),
    popupSelector: '.ui-datepicker-inline',
    inputSelector: '.date-picker__date',
    applyBtnSelector: false,
    classNameToToggle: 'date-picker_expanded',
  });
});
