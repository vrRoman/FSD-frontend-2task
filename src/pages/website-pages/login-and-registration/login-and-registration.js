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

      this.handleLoginButtonsClick = this.handleLoginButtonsClick.bind(this);
      this.handleSignupButtonsClick = this.handleSignupButtonsClick.bind(this);

      this.init();
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

  handleLoginButtonsClick() {
    this.$signupCard.hide();
    this.$signinCard.show();
    this.$pageElem.toggleClass(this.pageLoginClass);
  }

  handleSignupButtonsClick() {
    this.$signupCard.show();
    this.$signinCard.hide();
    this.$pageElem.toggleClass(this.pageLoginClass);
  }

  init() {
    this.$loginButtons.click(this.handleLoginButtonsClick);
    this.$signupButtons.click(this.handleSignupButtonsClick);
  }
}

// eslint-disable-next-line no-unused-vars
const loginAndRegistration = new LoginAndRegistration();
