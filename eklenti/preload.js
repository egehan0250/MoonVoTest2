$(document).ready(function() {
  setTimeout(function() {
    $('body').addClass('loaded');
  }, 1000);

  $('.reset').click(function() {
    $('body').removeClass('loaded');
    setTimeout(function() {
      $('body').addClass('loaded');
    }, 2000);
  });
});
