import autoBind from 'auto-bind';

class Header {
  constructor(elem) {
    autoBind(this);

    this.elem = elem;
    this.menu = null;
    this.hamburger = null;
    this.navigation = null;
    this.isMenuHidden = true;
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
    window.addEventListener('load', this._handleWindowLoad);
    this.hamburger.addEventListener('click', this._handleHamburgerClick);
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
      this.isMenuHidden = false;
      this.menu.classList.remove(this.hiddenMenuClass);
      this.hamburger.classList.remove(this.visibleHamburgerClass);
      this.navigation.classList.remove(this.columnNavClass);
      window.removeEventListener('click', this._handleWindowClick);
    } else {
      this.isMenuHidden = true;
      this.menu.classList.add(this.hiddenMenuClass);
      this.hamburger.classList.add(this.visibleHamburgerClass);
      this.navigation.classList.add(this.columnNavClass);
    }
  }

  _showMenu() {
    this.menu.classList.remove(this.hiddenMenuClass);
    this.isMenuHidden = false;

    window.addEventListener('click', this._handleWindowClick);
  }

  _hideMenu() {
    this.menu.classList.add(this.hiddenMenuClass);
    this.isMenuHidden = true;

    window.removeEventListener('click', this._handleWindowClick);
  }

  _handleWindowResize() {
    this._updateHeader();
  }

  _handleWindowLoad() {
    this._updateHeader();
  }

  _handleHamburgerClick() {
    if (this.isMenuHidden) {
      this._showMenu();
    } else {
      this._hideMenu();
    }
  }

  _handleWindowClick(event) {
    const shouldHide = !event.path.includes(this.menu) && !event.path.includes(this.hamburger);
    if (shouldHide) {
      this._hideMenu();
    }
  }
}

export default Header;
