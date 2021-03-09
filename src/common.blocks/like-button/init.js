/* eslint-disable no-unused-vars */

import LikeButton from '@/common.blocks/like-button/like-button';

$('.js-like-button').each(function init() {
  const likeButton = new LikeButton(this);
});
