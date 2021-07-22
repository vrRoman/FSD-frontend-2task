import autoBind from 'auto-bind';

class Header {
  constructor(elem) {
    autoBind(this);

    this.elem = elem;
    this.menu = null;
    this.hamburger = null;
    this.navigation = null;
    this.showHamburgerOn = 1200;
    this.hiddenMenuClass = 'header__menu_hidden';
    this.visibleHamburgerClass = 'header__hamburger_visible';
    this.columnNavClass = 'navigation_in-column';
  }

  init() {
    this.menu = this.getMenu();
    this.hamburger = this.getHamburger();
    this.navigation = this.getNavigation();

    window.addEventListener('resize', this._handleWindowResize);
    window.addEventListener('click', this._handleWindowClick);
    window.addEventListener('load', this._handleWindowLoad);
  }

  getHamburger() {
    const hamburgerSelector = '.js-header__hamburger';
    return this.elem.querySelector(hamburgerSelector);
  }

  getMenu() {
    const menuSelector = '.js-header__menu';
    return this.elem.querySelector(menuSelector);
  }

  getNavigation() {
    const navSelector = '.js-navigation';
    return this.elem.querySelector(navSelector);
  }

  _updateHeader() {
    if (window.innerWidth > this.showHamburgerOn) {
      this.menu.classList.remove(this.hiddenMenuClass);
      this.hamburger.classList.remove(this.visibleHamburgerClass);
      this.navigation.classList.remove(this.columnNavClass);
    } else {
      this.menu.classList.add(this.hiddenMenuClass);
      this.hamburger.classList.add(this.visibleHamburgerClass);
      this.navigation.classList.add(this.columnNavClass);
    }
  }

  _handleWindowResize() {
    this._updateHeader();
  }

  _handleWindowLoad() {
    this._updateHeader();
  }

  _handleWindowClick(evt) {
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
