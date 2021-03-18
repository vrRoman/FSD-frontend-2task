class Header {
  constructor(elem) {
    this.elem = elem;
    this.menu = this.getMenu();
    this.hamburger = this.getHamburger();
    this.showHamburgerOn = 1200;
    this.hiddenMenuClass = 'header__menu_hidden';
    this.visibleHamburgerClass = 'header__hamburger_visible';
    this.columnNavClass = 'navigation_in-column';
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleWindowLoad = this.handleWindowLoad.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);

    this.init();
  }

  getHamburger() {
    const hamburgerSelector = '.js-header__hamburger';
    return this.elem.querySelector(hamburgerSelector);
  }

  getMenu() {
    const menuSelector = '.js-header__menu';
    return this.elem.querySelector(menuSelector);
  }

  getNav() {
    const navSelector = '.js-navigation';
    return this.elem.querySelector(navSelector);
  }

  init() {
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('load', this.handleWindowLoad);
  }

  handleWindowResize() {
    this.updateHeader();
  }

  handleWindowLoad() {
    this.updateHeader();
  }

  updateHeader() {
    if (window.innerWidth > this.showHamburgerOn) {
      this.menu.classList.remove(this.hiddenMenuClass);
      this.hamburger.classList.remove(this.visibleHamburgerClass);
      this.getNav().classList.remove(this.columnNavClass);
    } else {
      this.menu.classList.add(this.hiddenMenuClass);
      this.hamburger.classList.add(this.visibleHamburgerClass);
      this.getNav().classList.add(this.columnNavClass);
    }
  }

  handleWindowClick(evt) {
    if (window.innerWidth <= this.showHamburgerOn) {
      if (evt.path.includes(this.hamburger)) {
        this.menu.classList.toggle(this.hiddenMenuClass);
      } else if (!evt.path.includes(this.menu)) {
        if (!this.menu.classList.contains(this.hiddenMenuClass)) {
          evt.stopPropagation();
          evt.preventDefault();
          this.menu.classList.add(this.hiddenMenuClass);
        }
      }
    }
  }
}

export default Header;
