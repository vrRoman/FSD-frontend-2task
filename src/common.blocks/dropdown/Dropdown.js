import autoBind from 'auto-bind';

class Dropdown {
  constructor(elem) {
    autoBind(this);

    this.elem = elem;
    this.textFields = null;
    this.textFieldInputs = null;
    this.defaultValue = null;
    this.popup = null;
    this.isPopupDistant = false;
    this.isPopupHidden = true;

    this.withDistantPopupClass = 'dropdown_with-distant-popup';
    this.hiddenPopupClass = 'dropdown__popup_hidden';
    this.doubleDropdownClass = 'dropdown_double';
    this.activeTextFieldClasses = ['text-field_focused', 'text-field_flat-bottom'];
  }

  init() {
    this.textFields = this.getTextFields();
    this.textFieldInputs = this.getTextFieldInputs();
    this.popup = this.getPopup();
    this.defaultValue = JSON.parse(this.elem.dataset.defaultValue);
    this.isPopupHidden = this.popup.classList.contains(this.hiddenPopupClass);
    this.isPopupDistant = this.elem.classList.contains(this.withDistantPopupClass);

    this._updateTextFieldsClasses();
    this._findAndSubscribeToPopupInstance();

    this.textFields.forEach((element) => element.addEventListener('click', this._handleTextFieldClick));
  }

  update(action) {
    this._changeTextFieldValue(action.valueText);

    if (action.type === 'CLICK_APPLY-BUTTON') {
      this._hidePopup();
    }
  }

  getPopup() {
    const popupSelector = '.js-dropdown__popup';
    return this.elem.querySelector(popupSelector);
  }

  getTextFields() {
    const textFieldSelector = '.js-dropdown__text-field .js-text-field';
    return Array.from(this.elem.querySelectorAll(textFieldSelector));
  }

  getTextFieldInputs() {
    const inputSelector = '.js-text-field__input';
    const inputs = [];
    this.textFields.forEach((elem) => {
      inputs.push(elem.querySelector(inputSelector));
    });
    return inputs;
  }

  _findAndSubscribeToPopupInstance() {
    const blockInPopup = $(this.popup).find('> *');
    const instance = blockInPopup.data('instance');
    try {
      instance.subscribe(this);
    } catch {
      throw new Error('blockInPopup.data() must have a \'instance\' prop with subscribe property');
    }
  }

  _updateTextFieldsClasses() {
    if (this.isPopupHidden) {
      this.textFields.forEach((element) => {
        element.classList.remove(...this.activeTextFieldClasses);
      });
    } else if (!this.isPopupDistant) {
      this.textFields.forEach((element) => {
        element.classList.add(...this.activeTextFieldClasses);
      });
    }
  }

  _changeTextFieldValue(text) {
    if (this._isDropdownDouble()) {
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

  _isDropdownDouble() {
    return this.elem.classList.contains(this.doubleDropdownClass);
  }

  _showPopup() {
    this.isPopupHidden = false;
    this.popup.classList.remove(this.hiddenPopupClass);
    this._updateTextFieldsClasses();
    window.addEventListener('click', this._handleWindowClick);
  }

  _hidePopup() {
    this.isPopupHidden = true;
    this.popup.classList.add(this.hiddenPopupClass);
    this._updateTextFieldsClasses();
    window.removeEventListener('click', this._handleWindowClick);
  }

  _handleTextFieldClick() {
    if (this.isPopupHidden) {
      this._showPopup();
    } else {
      this._hidePopup();
    }
  }

  _handleWindowClick(event) {
    if (event.composedPath().includes(this.elem)) return;

    this._hidePopup();
  }
}

export default Dropdown;
