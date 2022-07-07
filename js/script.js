"use strict";

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs  from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {showModal} from './modules/modal';

// DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
   
    // Modal через определенное время
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 600000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    calc();
    cards();
    forms('form', modalTimerId);
    modal('.modal', '[data-modal]', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2022-06-29');

});

