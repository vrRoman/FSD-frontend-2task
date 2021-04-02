class LoginAndRegistration {
  constructor() {
    this.pageSelector = '.js-login-and-registration';
    if (this.getPageElem()) {
      this.loginButtonsSelector = '.js-signup-card__account-exists .js-button';
      this.signupButtonsSelector = '.js-signin-card__account-not-exists .js-button';
      this.signinCardSelector = '.js-login-and-registration__signin-card';
      this.signupCardSelector = '.js-login-and-registration__signup-card';
      this.pageLoginClass = 'login-and-registration_login';

      this.$loginButtons = this.getLoginButtons();
      this.$signupButtons = this.getSignupButtons();
      this.$signinCard = this.getSigninCard();
      this.$signupCard = this.getSignupCard();
      this.$pageElem = this.getPageElem();

      this._handleLoginButtonsClick = this._handleLoginButtonsClick.bind(this);
      this._handleSignupButtonsClick = this._handleSignupButtonsClick.bind(this);

      this._init();
    }
  }

  getLoginButtons() {
    return $(this.loginButtonsSelector);
  }

  getSignupButtons() {
    return $(this.signupButtonsSelector);
  }

  getSigninCard() {
    return $(this.signinCardSelector);
  }

  getSignupCard() {
    return $(this.signupCardSelector);
  }

  getPageElem() {
    return $(this.pageSelector);
  }

  _init() {
    this.$loginButtons.click(this._handleLoginButtonsClick);
    this.$signupButtons.click(this._handleSignupButtonsClick);
  }

  _handleLoginButtonsClick() {
    this.$signupCard.hide();
    this.$signinCard.show();
    this.$pageElem.toggleClass(this.pageLoginClass);
  }

  _handleSignupButtonsClick() {
    this.$signupCard.show();
    this.$signinCard.hide();
    this.$pageElem.toggleClass(this.pageLoginClass);
  }
}

// eslint-disable-next-line no-unused-vars
const loginAndRegistration = new LoginAndRegistration();
