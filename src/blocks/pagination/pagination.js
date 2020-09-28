import 'simple-pagination.js'


const items = 180
const itemsOnPage = 12

$('.pagination__pages').pagination({
    items: items,
    itemsOnPage: itemsOnPage,
    displayedPages: 3,
    edges: 1,
    prevText: false,
    nextText: '<i class="pagination__arrow material-icons">arrow_forward</i>'
})