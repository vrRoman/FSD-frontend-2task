class LikeButton {
  constructor(elem) {
    this.elem = elem;
    this.value = Number(this.getNumberElem().innerText);
    this.activeClass = 'like-button_active';
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);

    this._init();
  }

  getNumberElem() {
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
    this.getNumberElem().innerText = this.value;
    this.elem.classList.toggle(this.activeClass);
  }
}

export default LikeButton;
