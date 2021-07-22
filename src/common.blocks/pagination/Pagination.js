class Pagination {
  constructor(elem) {
    this.elem = elem;
    this.pagesElem = this.getPagesElem();
    this.pagesSelector = '.js-pagination__pages';
    this.itemsNumber = 180;
    this.itemsOnPage = 12;

    this._init();
  }

  getPagesElem() {
    return this.elem.querySelector(this.pagesSelector);
  }

  _init() {
    $(this.pagesElem).pagination({
      items: this.itemsNumber,
      itemsOnPage: this.itemsOnPage,
      displayedPages: 3,
      edges: 1,
      prevText: false,
      nextText: '<i class="pagination__arrow material-icons">arrow_forward</i>',
    });
  }
}

export default Pagination;
