class ExpandableCheckboxes {
  constructor(elem) {
    this.elem = elem;
    this.isListening = false;
    this.expandedClassName = 'expandable-checkboxes_expanded';
    this.isExpanded = this.elem.classList.contains(this.expandedClassName);
    this.handleWindowClick = this.handleWindowClick.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('click', this.handleWindowClick);
  }

  getCheckboxes() {
    const checkboxesSelector = '.js-expandable-checkboxes__checkboxes';
    return this.elem.querySelector(checkboxesSelector);
  }

  handleWindowClick(evt) {
    const isClickedOnElem = evt.path.includes(this.elem);
    const isClickedOnCheckboxes = evt.path.includes(this.getCheckboxes());

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