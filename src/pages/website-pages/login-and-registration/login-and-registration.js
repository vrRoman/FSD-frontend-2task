import '@/js/index';
import '@/sass/main.sass';

import './login-and-registration.pug';
import './login-and-registration.sass';

import './images/login-registration-bg.jpg';

import '@/common.blocks/signup-card/signup-card';
import '@/common.blocks/header/init';

const $loginButtons = $('.signup-card__account-exists .button');
const $signupButtons = $('.signin-card__account-not-exists .button');
const $signinCard = $('.login-and-registration__signin-card');
const $signupCard = $('.login-and-registration__signup-card');
const $pageElem = $('.login-and-registration');
const pageElemLoginClass = 'login-and-registration_login';

function showSigninCard() {
  $signupCard.hide();
  $signinCard.show();
  $pageElem.toggleClass(pageElemLoginClass);
}
function showSignupCard() {
  $signupCard.show();
  $signinCard.hide();
  $pageElem.toggleClass(pageElemLoginClass);
}

$loginButtons.click(showSigninCard);
$signupButtons.click(showSignupCard);
