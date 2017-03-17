var entryContentElement = null;
var entriesElement = null;

var appendGuestbookEntries = function(data) {
  entriesElement.empty();
  $.each(data, function(key, val) {
    entriesElement.append("<p>" + val + "</p>");
  });
}

var handleSubmission = function(score) {
  console.log("sanity")
  //e.preventDefault();
  var name = entryContentElement.val()
  if (name.length <= 0) {
    name = "anonymous";
  }
  entriesElement.append("<p>...</p>");
  val = name + ": " + score;
  console.log(val);
  $.getJSON("rpush/guestbook/" + val, appendGuestbookEntries);
}

$(document).ready(function() {
  var headerTitleElement = $("#header h1");
  entriesElement = $("#hi-scores");
  //var formElement = $("#name");
  //var submitElement = $("#guestbook-submit");
  entryContentElement = $("#guestbook-entry-content");
  var hostAddressElement = $("#guestbook-host-address");

  // colors = purple, blue, red, green, yellow
  var colors = ["#549", "#18d", "#d31", "#2a4", "#db1"];
  var randomColor = colors[Math.floor(5 * Math.random())];
  (function setElementsColor(color) {
    headerTitleElement.css("color", color);
    entryContentElement.css("box-shadow", "inset 0 0 0 2px " + color);
    //submitElement.css("background-color", color);
  })(randomColor);

  //submitElement.click(handleSubmission);
  //formElement.submit(handleSubmission);
  hostAddressElement.append(document.URL);

  // Poll every second.
  (function fetchGuestbook() {
    $.getJSON("lrange/guestbook").done(appendGuestbookEntries).always(
      function() {
        setTimeout(fetchGuestbook, 1000);
      });
  })();
});
