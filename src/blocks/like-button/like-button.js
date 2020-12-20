function likeHandler() {
  const likeNumElem = this.querySelector('.like-button__like-num');

  if (this.classList.contains('like-button_active')) {
    likeNumElem.innerHTML = String(+likeNumElem.innerHTML - 1);
  } else {
    likeNumElem.innerHTML = String(+likeNumElem.innerHTML + 1);
  }

  this.classList.toggle('like-button_active');
}

$('.js-like-button').click(likeHandler);