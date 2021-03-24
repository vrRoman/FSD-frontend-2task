import 'simple-pagination.js/jquery.simplePagination';

class Pagination {
  constructor(elem) {
    this.elem = elem;
    this.pagesSelector = '.js-pagination__pages';
    this.itemsNumber = 180;
    this.itemsOnPage = 12;

    this.init();
  }

  init() {
    $(this.getPagesElem()).pagination({
      items: this.itemsNumber,
      itemsOnPage: this.itemsOnPage,
      displayedPages: 3,
      edges: 1,
      prevText: false,
      nextText: '<i class="pagination__arrow material-icons">arrow_forward</i>',
    });
  }

  getPagesElem() {
    return this.elem.querySelector(this.pagesSelector);
  }
}

export default Pagination;