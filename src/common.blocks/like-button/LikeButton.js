import autoBind from 'auto-bind';

class LikeButton {
  constructor(elem) {
    this.elem = elem;
    this.numberElement = this.getNumberElement();
    this.value = Number(this.numberElement.innerText);
    this.activeClass = 'like-button_active';

    autoBind(this);

    this._init();
  }

  getNumberElement() {
    const numberElemSelector = '.js-like-button__number';
    return this.elem.querySelector(numberElemSelector);
  }

  isActive() {
    return this.elem.classList.contains(this.activeClass);
  }

  _init() {
    this.elem.addEventListener('click', this._handleLikeButtonClick);
  }

  _handleLikeButtonClick() {
    if (this.isActive()) {
      this.value -= 1;
    } else {
      this.value += 1;
    }
    this.numberElement.innerText = this.value;
    this.elem.classList.toggle(this.activeClass);
  }
}

export default LikeButton;
