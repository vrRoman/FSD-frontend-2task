import autoBind from 'auto-bind';

class LoginAndRegistration {
  constructor(pageElem) {
    autoBind(this);

    this.$pageElem = $(pageElem);
    this.$loginButtons = null;
    this.$signupButtons = null;
    this.$signinCard = null;
    this.$signupCard = null;

    this.loginButtonsSelector = '.js-signup-card__account-exists .js-button';
    this.signupButtonsSelector = '.js-signin-card__account-not-exists .js-button';
    this.signinCardSelector = '.js-login-and-registration__signin-card';
    this.signupCardSelector = '.js-login-and-registration__signup-card';
    this.pageLoginClass = 'login-and-registration_login';
  }

  init() {
    this.$loginButtons = this.getLoginButtons();
    this.$signupButtons = this.getSignupButtons();
    this.$signinCard = this.getSigninCard();
    this.$signupCard = this.getSignupCard();

    this.$loginButtons.on('click', this._handleLoginButtonsClick);
    this.$signupButtons.on('click', this._handleSignupButtonsClick);
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
