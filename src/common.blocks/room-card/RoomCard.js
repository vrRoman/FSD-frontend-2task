class RoomCard {
  constructor(elem) {
    this.elem = elem;
    this.sliderElem = null;
  }

  init() {
    this.sliderElem = this.getSliderElem();

    $(this.sliderElem).slick({
      dots: true,
      arrows: true,
      prevArrow: '<span class="slick-prev slick-arrow material-icons" aria-label="Next"></span>',
      nextArrow: '<span class="slick-next slick-arrow material-icons" aria-label="Next"></span>',
    });
  }

  getSliderElem() {
    const sliderSelector = '.js-room-card__slider';
    return this.elem.querySelector(sliderSelector);
  }
}

export default RoomCard;
