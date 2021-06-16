$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const count = 140 - $(this).val().length;
    $(".counter").text(count);
    if (count < 0) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', 'grey');
    }
  })
});
