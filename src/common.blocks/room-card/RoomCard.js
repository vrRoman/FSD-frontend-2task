class RoomCard {
  constructor(elem) {
    this.elem = elem;
    this.sliderElem = this.getSliderElem();
    this._init();
  }

  getSliderElem() {
    const sliderSelector = '.js-room-card__slider';
    return this.elem.querySelector(sliderSelector);
  }

  _init() {
    $(this.sliderElem).slick({
      dots: true,
      arrows: true,
      prevArrow: '<span class="slick-prev slick-arrow material-icons" aria-label="Next"></span>',
      nextArrow: '<span class="slick-next slick-arrow material-icons" aria-label="Next"></span>',
    });
  }
}

export default RoomCard;
