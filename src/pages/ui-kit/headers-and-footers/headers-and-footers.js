/* eslint-disable no-unused-vars */

import '@/js/index';

import '@/sass/main.sass';

import './headers-and-footers.pug';
import './headers-and-footers.sass';

import Header from '@/common.blocks/header/header';

const $headers = $('.header');
$headers.each(function init() {
  const header = new Header(this);
});
