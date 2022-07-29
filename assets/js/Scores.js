function printHighScores() {
  // get scores from localstorage
  var HighScores = JSON.parse(window.localStorage.getItem("HighScores")) || [];
  // sort in decending order
  HighScores.sort(function (a, b) {
    return b.score - a.score;
  });
  // create list tags for the scores
  HighScores.forEach(function (score) {
    var li = document.createElement("li");
    li.textContent = score.Name + "-" + score.score;
    //   display
    var ol = document.getElementById("HighScores");
    ol.appendChild(li);
  });
}

function clearHighScores() {
  window.localStorage.removeItem("HighScores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighScores;
printHighScores();
