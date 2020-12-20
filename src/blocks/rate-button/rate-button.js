const starSelector = '.js-rate-button__star';
const activeStarClass = 'rate-button__star_active';

$(starSelector)
  .hover(function handleStarHover() {
    $(this).addClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:lt(${$(this).index()})`)
      .addClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:gt(${$(this).index()})`)
      .removeClass(activeStarClass);
  })
  .mouseout(function handleStarMouseout() {
    $(this).parent()
      .find(`${starSelector}:eq(${$(this).parent().data('current-rating')})`)
      .removeClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:gt(${$(this).parent().data('current-rating')})`)
      .removeClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:lt(${$(this).parent().data('current-rating')})`)
      .addClass(activeStarClass);
  })
  .click(function handleStarClick() {
    $(this).parent().data('current-rating', $(this).index() + 1);

    $(this).addClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:lt(${$(this).index()})`)
      .addClass(activeStarClass);

    $(this).parent()
      .find(`${starSelector}:gt(${$(this).index()})`)
      .removeClass(activeStarClass);
  });
