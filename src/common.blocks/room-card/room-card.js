class RoomCard {
  constructor(elem) {
    this.elem = elem;
    this.init();
  }

  getSliderElem() {
    const sliderSelector = '.js-room-card__slider';
    return this.elem.querySelector(sliderSelector);
  }

  init() {
    $(this.getSliderElem()).slick({
      dots: true,
      arrows: true,
      prevArrow: '<i class="slick-prev slick-arrow material-icons" aria-label="Next"></i>',
      nextArrow: '<i class="slick-next slick-arrow material-icons" aria-label="Next"></i>',
    });
  }
}

export default RoomCard;
