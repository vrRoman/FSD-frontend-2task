class Dropdown {
  constructor(elem) {
    this.elem = elem;
    this.textFields = this.getTextFields();
    this.textFieldInputs = this.getTextFieldInputs();
    this.defaultValue = JSON.parse(this.elem.dataset.defaultValue);
    this.popup = this.getPopup();
    this.hiddenPopupClass = 'dropdown__popup_hidden';
    this.doubleDropdownClass = 'dropdown_double';
    this.activeTextFieldClasses = ['text-field_focused', 'text-field_flat-bottom'];
    this.isListening = false;

    this.updateTextFieldsClasses();

    this.handleWindowClick = this.handleWindowClick.bind(this);

    this.addWindowListener();

    this.findAndSubscribeToPopupInstance();
  }

  findAndSubscribeToPopupInstance() {
    const blockInPopup = $(this.popup).find('> *');
    const instance = blockInPopup.data('instance');
    try {
      instance.subscribe(this);
    } catch {
      throw new Error('blockInPopup.data() must have a \'instance\' prop with subscribe property');
    }
  }

  updateTextFieldsClasses() {
    if (!this.isPopupHidden()) {
      this.textFields.forEach((el) => {
        el.classList.add(...this.activeTextFieldClasses);
      });
    }
  }

  update(action) {
    this.changeTextFieldValue(action.valueText);

    if (action.type === 'CLICK_APPLY-BUTTON') {
      this.popup.classList.add(this.hiddenPopupClass);
      this.textFields.forEach((el) => {
        el.classList.remove(...this.activeTextFieldClasses);
      });
    }
  }

  changeTextFieldValue(text) {
    if (this.isDropdownDouble()) {
      if (Array.isArray(text)) {
        text.forEach((value, i) => {
          if (!value) {
            this.textFieldInputs[i].value = this.defaultValue;
          } else {
            this.textFieldInputs[i].value = value;
          }
        });
      } else {
        this.textFieldInputs.forEach((input, i) => {
          if (!text) {
            this.textFieldInputs[i].value = this.defaultValue;
          } else {
            this.textFieldInputs[i].value = text;
          }
        });
      }
    } else if (!text) {
      this.textFieldInputs[0].value = this.defaultValue;
    } else {
      this.textFieldInputs[0].value = text;
    }
  }

  getPopup() {
    const popupSelector = '.js-dropdown__popup';
    return this.elem.querySelector(popupSelector);
  }

  getTextFields() {
    const textFieldSelector = '.js-dropdown__text-field .js-text-field';
    return this.elem.querySelectorAll(textFieldSelector);
  }

  getTextFieldInputs() {
    const inputSelector = '.js-text-field__input';
    const inputs = [];
    this.textFields.forEach((elem) => {
      inputs.push(elem.querySelector(inputSelector));
    });
    return inputs;
  }

  isPopupHidden() {
    return this.popup.classList.contains(this.hiddenPopupClass);
  }

  isDropdownDouble() {
    return this.elem.classList.contains(this.doubleDropdownClass);
  }

  addWindowListener() {
    window.addEventListener('click', this.handleWindowClick);
  }

  handleWindowClick(evt) {
    if (evt.path.includes(this.elem)) {
      this.isListening = true;
      if (!evt.path.includes(this.popup)) {
        if (this.isPopupHidden()) {
          this.popup.classList.remove(this.hiddenPopupClass);
          this.textFields.forEach((el) => {
            el.classList.add(...this.activeTextFieldClasses);
          });
        } else {
          this.popup.classList.add(this.hiddenPopupClass);
          this.textFields.forEach((el) => {
            el.classList.remove(...this.activeTextFieldClasses);
          });
        }
      }
    } else if (this.isListening) {
      this.popup.classList.add(this.hiddenPopupClass);
      this.textFields.forEach((el) => {
        el.classList.remove(...this.activeTextFieldClasses);
      });
    }
  }
}

export default Dropdown;
