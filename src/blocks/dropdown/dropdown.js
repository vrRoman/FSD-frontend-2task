import {countedItems, dropdown} from "@/js/dropdown";

$(document).ready(() => {
    dropdown($('.dropdown'), '.dropdown__popup',
        '.dropdown__input', 'dropdown_expanded')

    countedItems($('.dropdown'), '.dropdown__text', '.items-popup__item',
        '.items-popup__add-value', '.items-popup__remove-value',
        '.items-popup__title', '.items-popup__value h3', 'items-popup__change-value_inactive')

    dropdown($('.date-picker'), '.ui-datepicker-inline',
        '.date-picker__date', 'date-picker_expanded')
})