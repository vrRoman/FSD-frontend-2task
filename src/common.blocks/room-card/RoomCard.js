import data from './sliderData';

class RoomCard {
  constructor(elem) {
    this.elem = elem;
    this.sliderElem = null;
  }

  init() {
    this.sliderElem = this.getSliderElem();

    $(this.sliderElem).slick({
      ...data,
      dots: true,
      arrows: true,
    });
  }

  getSliderElem() {
    const sliderSelector = '.js-room-card__slider';
    return this.elem.querySelector(sliderSelector);
  }
}

export default RoomCard;
