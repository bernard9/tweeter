/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const time = $(".time-ago").attr("datetime");
  const newTime = timeago.format(time);
  $(".time-ago").text(newTime);

  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="tweets">
<header>
  <div class="user-icon">
    <img id="man" src="/images/man.png"> 
    <span>Newton</span>
  </div>
  <span>@SirIssac</span>
</header>
<p>If I have seen further it is by standing on the shoulders giants</p>
<footer>
  <span class="time-ago" datetime="June 15, 2021"></span>
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
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $tweets.append(newTweet);
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
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    });
  });
  loadTweets();
});
