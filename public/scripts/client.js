/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  let time = $(".time-ago").attr("datetime");
  let newTime = timeago.format(time);
  $(".time-ago").text(newTime);
});