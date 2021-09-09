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

    this.update();
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

  update() {
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name !== 'action') return;

        if (value === 'registration') {
          this.$signupCard.show();
          this.$signinCard.hide();
          this.$pageElem.removeClass(this.pageLoginClass);
        }
        if (value === 'login') {
          this.$signupCard.hide();
          this.$signinCard.show();
          this.$pageElem.addClass(this.pageLoginClass);
        }
      });
  }

  _handleLoginButtonsClick() {
    const params = new URLSearchParams(window.location.search);
    params.set('action', 'login');
    window.history.pushState(
      null,
      null,
      `${window.location.pathname}?${params.toString()}`,
    );
    this.update();
  }

  _handleSignupButtonsClick() {
    const params = new URLSearchParams(window.location.search);
    params.set('action', 'registration');
    window.history.pushState(
      null,
      null,
      `${window.location.pathname}?${params.toString()}`,
    );
    this.update();
  }
}

export default LoginAndRegistration;
