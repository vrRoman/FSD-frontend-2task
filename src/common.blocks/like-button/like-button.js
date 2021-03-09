class LikeButton {
  constructor(elem) {
    this.elem = elem;
    this.value = +this.getNumberElem().innerText;
    this.activeClass = 'like-button_active';
    this.handleLikeButtonClick = this.handleLikeButtonClick.bind(this);

    this.init();
  }

  getNumberElem() {
    const numberElemSelector = '.js-like-button__number';
    return this.elem.querySelector(numberElemSelector);
  }

  isActive() {
    return this.elem.classList.contains(this.activeClass);
  }

  handleLikeButtonClick() {
    if (this.isActive()) {
      this.value -= 1;
    } else {
      this.value += 1;
    }
    this.getNumberElem().innerText = this.value;
    this.elem.classList.toggle(this.activeClass);
  }

  init() {
    this.elem.addEventListener('click', this.handleLikeButtonClick);
  }
}

export default LikeButton;
