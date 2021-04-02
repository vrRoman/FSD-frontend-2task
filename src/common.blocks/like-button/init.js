/* eslint-disable no-unused-vars */

import LikeButton from '@/common.blocks/like-button/LikeButton';

$('.js-like-button').each(function init() {
  const likeButton = new LikeButton(this);
});
