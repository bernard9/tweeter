/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


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
<p>${tweet.content.text}</p>
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

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    // gets "past-tweets" section
    const $tweets = $('.past-tweets');
    $tweets.empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $tweets.prepend(newTweet);
    }
  };

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

  $("form").on('submit', function(event) {
    event.preventDefault();
    const content = $("#tweet-text").val();
    if (content.length > 140) {
      alert("Message exceeds 140 characters");
    } else if (content === '') {
      alert("Message is empty");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function() {
          $("#tweet-text").val("").focus();
          $(".counter").text("140");
          loadTweets();
        }
      });
    }
  });
  loadTweets();
});
