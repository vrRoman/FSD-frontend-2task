import '@/js/index'
import '@/sass/main.sass'
import '@/sass/ui-kit.sass'

import './login-and-registration.pug'
import './login-and-registration.sass'

import './images/login-registration-bg.jpg'


const loginButtons = $('.signup-card__account-exists .button'),
      signupButtons = $('.signin-card__account-not-exists .button')
const signinCard = $('.login-and-registration__signin-card'),
      signupCard = $('.login-and-registration__signup-card')


loginButtons.click(showSigninCard)
signupButtons.click(showSignupCard)


function showSigninCard() {
    signupCard.hide()
    signinCard.show()
}
function showSignupCard() {
    signupCard.show()
    signinCard.hide()
}
