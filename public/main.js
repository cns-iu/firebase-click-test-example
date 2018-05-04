// Assumes config.js was included before this script
var database = firebase.database();
var clicksRef = firebase.database().ref('clicks');

var responseId = getResponseId();
var leftClicked = false;
var rightClicked = false;

function getResponseId() {
  return getParameterByName('responseId') || 'NULL';
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function writeClick(responseId, circle, x, y, date) {
  var newClicksRef = clicksRef.push();
  newClicksRef.set({
    responseId: responseId,
    circle: circle,
    x: x,
    y: y,
    date: date.toUTCString(),
    timestamp: date.getTime()
  });
}

function getRelativeXY(event) {
  var element = document.getElementById("box");
  var x = event.pageX - element.offsetLeft + 320;
  var y = event.pageY - element.offsetTop + 240;
  return [x, y];
}

function topLeftClicked(event) {
  var xy = getRelativeXY(event);
  writeClick(responseId, 'top-left', xy[0], xy[1], new Date());
  leftClicked = true;
  possiblyShowPopup()
}

function bottomRightClicked(event) {
  var xy = getRelativeXY(event);
  writeClick(responseId, 'bottom-right', xy[0], xy[1], new Date());
  rightClicked = true;
  possiblyShowPopup();
}

function possiblyShowPopup() {
  if (leftClicked && rightClicked) {
    var element = document.getElementById("popup");
    element.classList.remove("hidden");
  }
}
