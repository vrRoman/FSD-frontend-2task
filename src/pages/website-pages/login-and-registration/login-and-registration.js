import '@/js/index'
import '@/sass/main.sass'
import '@/sass/ui-kit.sass'

import './login-and-registration.pug'
import './login-and-registration.sass'

import './images/login-registration-bg.jpg'

import '@blocks/header/header'


const loginButtons = $('.signup-card__account-exists .button'),
      signupButtons = $('.signin-card__account-not-exists .button')
const signinCard = $('.login-and-registration__signin-card'),
      signupCard = $('.login-and-registration__signup-card')
const pageElem = $('.login-and-registration'),
      pageElemLoginClass = 'login-and-registration_login'

loginButtons.click(showSigninCard)
signupButtons.click(showSignupCard)


function showSigninCard() {
    signupCard.hide()
    signinCard.show()
    pageElem.toggleClass(pageElemLoginClass)
}
function showSignupCard() {
    signupCard.show()
    signinCard.hide()
    pageElem.toggleClass(pageElemLoginClass)
}
