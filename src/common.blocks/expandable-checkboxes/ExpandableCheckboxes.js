import autoBind from 'auto-bind';

class ExpandableCheckboxes {
  constructor(elem) {
    autoBind(this);

    this.elem = elem;
    this.checkboxes = null;
    this.expandedClassName = 'expandable-checkboxes_expanded';
    this.isListening = false;
    this.isExpanded = false;
  }

  init() {
    this.checkboxes = this.getCheckboxes();
    this.isExpanded = this.elem.classList.contains(this.expandedClassName);
    window.addEventListener('click', this._handleWindowClick);
  }

  getCheckboxes() {
    const checkboxesSelector = '.js-expandable-checkboxes__checkboxes';
    return this.elem.querySelector(checkboxesSelector);
  }

  _handleWindowClick(evt) {
    const isClickedOnElem = evt.path.includes(this.elem);
    const isClickedOnCheckboxes = evt.path.includes(this.checkboxes);

    if (isClickedOnElem) {
      this.isListening = true;
    }

    if (this.isListening) {
      if (this.isExpanded) {
        if (!isClickedOnCheckboxes) {
          this.isExpanded = false;
          this.elem.classList.remove(this.expandedClassName);
        }
      } else if (isClickedOnElem) {
        this.isExpanded = true;
        this.elem.classList.add(this.expandedClassName);
      }
    }
  }
}

export default ExpandableCheckboxes;
