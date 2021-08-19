import autoBind from 'auto-bind';

class ExpandableCheckboxes {
  constructor(element) {
    autoBind(this);

    this.element = element;
    this.checkboxes = null;
    this.titleElement = null;
    this.expandedClassName = 'expandable-checkboxes_expanded';
    this.isExpanded = false;
  }

  init() {
    this.checkboxes = this.getCheckboxes();
    this.titleElement = this.getTitleElement();
    this.isExpanded = this.element.classList.contains(this.expandedClassName);

    this.titleElement.addEventListener('click', this._handleTitleClick);
  }

  getCheckboxes() {
    const checkboxesSelector = '.js-expandable-checkboxes__checkboxes';
    return this.element.querySelector(checkboxesSelector);
  }

  getTitleElement() {
    const titleSelector = '.js-expandable-checkboxes__title';
    return this.element.querySelector(titleSelector);
  }

  _showCheckboxes() {
    this.element.classList.add(this.expandedClassName);
    this.isExpanded = true;
    window.addEventListener('click', this._handleWindowClick);
  }

  _hideCheckboxes() {
    this.element.classList.remove(this.expandedClassName);
    this.isExpanded = false;
    window.removeEventListener('click', this._handleWindowClick);
  }

  _handleTitleClick() {
    if (this.isExpanded) {
      this._hideCheckboxes();
    } else {
      this._showCheckboxes();
    }
  }

  _handleWindowClick(event) {
    if (event.composedPath().includes(this.element)) return;

    this._hideCheckboxes();
  }
}

export default ExpandableCheckboxes;
