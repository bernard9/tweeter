/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // prevents scripts from running when entered in textarea
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // creates a HTML container with information entered in new tweets
  const createTweetElement = function(tweet) {
    const time = tweet.created_at;
    const newTime = timeago.format(time);
    let $tweet = $(`<article class="tweets">
<header>
  <div class="user-icon">
    <img src="${tweet.user.avatars}"> 
    <span>${tweet.user.name}</span>
  </div>
  <span>${tweet.user.handle}</span>
</header>
<p>${escape(tweet.content.text)}</p>
<footer>
  <span class="time-ago">${newTime}</span>
  <div class="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>
</article>`);
    return $tweet;
  };

  // calls createTweetElement and prepends tweets to existing list
  const renderTweets = function(tweets) {
    const $tweets = $('.past-tweets');
    $tweets.empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $tweets.prepend(newTweet);
    }
  };

  // loads tweets as soon as page loads
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweet) => {
        renderTweets(tweet);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  // nav arrow button hides textarea by default, toggles show and hide also focus to text area
  $('.new-tweet').hide();
  $('.nav-button').on("click", function() {
    $('.new-tweet').toggle()
    $("#tweet-text").focus();;
  });

  // detects if no characters (excluding start and end spaces), or over 140 characters.
  // If neither: clear textarea, returns focus to text area, reset counter, clear any error text and prepend new Tweet element to list.
  $("form").on('submit', function(event) {
    event.preventDefault();
    const content = $("#tweet-text").val();
    if (content.length > 140) {
      $(".error").text("⚠️ Message exceeds 140 characters ⚠️").slideDown();
    } else if (content.trim() === '') {
      $(".error").text("⚠️ Message is empty ⚠️").slideDown();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function() {
          $("#tweet-text").val("").focus();
          $(".counter").text("140");
          $(".error").hide();
          loadTweets();
        }
      });
    }
  });
  loadTweets();
});
