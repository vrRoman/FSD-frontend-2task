import autoBind from 'auto-bind';

class LoginAndRegistration {
  constructor(pageElem) {
    this.loginButtonsSelector = '.js-signup-card__account-exists .js-button';
    this.signupButtonsSelector = '.js-signin-card__account-not-exists .js-button';
    this.signinCardSelector = '.js-login-and-registration__signin-card';
    this.signupCardSelector = '.js-login-and-registration__signup-card';
    this.pageLoginClass = 'login-and-registration_login';

    this.$loginButtons = this.getLoginButtons();
    this.$signupButtons = this.getSignupButtons();
    this.$signinCard = this.getSigninCard();
    this.$signupCard = this.getSignupCard();
    this.$pageElem = $(pageElem);

    autoBind(this);

    this._init();
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

  _init() {
    this.$loginButtons.on('click', this._handleLoginButtonsClick);
    this.$signupButtons.on('click', this._handleSignupButtonsClick);
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

export default LoginAndRegistration;
