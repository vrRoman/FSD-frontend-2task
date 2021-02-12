import LikeButton from '@/common.blocks/like-button/like-button';

class Comment {
  constructor(elem) {
    this.elem = elem;

    this.likeButtonInstance = new LikeButton(this.getLikeButton());
  }

  getLikeButton() {
    const likeButtonSelector = '.comment__likes .like-button';
    return this.elem.querySelector(likeButtonSelector);
  }
}

export default Comment;
