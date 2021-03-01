/* eslint-disable no-unused-vars */

import '@/sass/main.sass';

import './landing-page.sass';
import './landing-page.pug';

import './images/landing-page-bg.jpg';

import Header from '@/common.blocks/header/header';
import SearchCard from '@/common.blocks/search-card/search-card';

const header = new Header(document.querySelector('.header'));
const searchCard = new SearchCard(document.querySelector('.search-card'));
