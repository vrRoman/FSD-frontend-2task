const hamburgerSelector = '.header__hamburger'
const menuSelector = '.header__menu'
const displayStyle = 'flex'
const hamburgerActiveClass = 'header__hamburger_active'
const showOn = 1200


$(hamburgerSelector).click(function() {
    const menu = $(this).parent().find(menuSelector)

    $(this).toggleClass(hamburgerActiveClass)
    if (menu.css('display') !== 'none')
        menu.css('display', 'none')
    else
        menu.css('display', displayStyle)
})

window.addEventListener('resize', function() {
    if (window.innerWidth >= showOn)
        if ($(menuSelector).css('display') === 'none')
            $(menuSelector).css('display', displayStyle)
        else $(menuSelector).css('display', '')
})
