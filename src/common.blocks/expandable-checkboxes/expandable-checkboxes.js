class ExpandableCheckboxes {
  constructor(elem) {
    this.elem = elem;
    this.listening = false;
    this.expandedClassName = 'expandable-checkboxes_expanded';
    this.expanded = this.elem.classList.contains(this.expandedClassName);
    this.handleWindowClick = this.handleWindowClick.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('click', this.handleWindowClick);
  }

  getCheckboxes() {
    const checkboxesSelector = '.expandable-checkboxes__checkboxes';
    return this.elem.querySelector(checkboxesSelector);
  }

  handleWindowClick(evt) {
    const clickedOnElem = evt.path.includes(this.elem);
    const clickedOnCheckboxes = evt.path.includes(this.getCheckboxes());

    if (clickedOnElem) {
      this.listening = true;
    }

    if (this.listening) {
      if (this.expanded) {
        if (!clickedOnCheckboxes) {
          this.expanded = false;
          this.elem.classList.remove(this.expandedClassName);
        }
      } else if (clickedOnElem) {
        this.expanded = true;
        this.elem.classList.add(this.expandedClassName);
      }
    }
  }
}

export default ExpandableCheckboxes;
