// DOM Elements
var timerEl = document.querySelector("#tik-tok");
var startBtn = document.querySelector("#Begin");
var questionsEl = document.querySelector("#QuizQList");
var Questions = document.querySelector("#questions");
var OptionsEl = document.querySelector("#Options");
var RightWrongEl = document.querySelector("#result");
var initialsEl = document.querySelector("#Names");
var submitBtn = document.querySelector("#submit");
var timeleft = 50;
var totalPoints = 0;

// quiz timer stat
var QuestionNumber = 0;
var time = Questions.length * 10;
var tickerId;

document.getElementById("startBtn").addEventListener("click", StartQuiz);
function StartQuiz() {
  // hide intro panel
  var introEl = document.getElementById("#introPanel");
  introEl.setAttribute("class", "hide");
  // unhide quiz questions panel
  questionsEl.removeAttribute("class");
  // start countdown
  tickerId = setInterval(counter, 1000);
  timerEl.textContent = time;
  getQuizQList();
}

function getQuizQList() {
  // get question from array
  var presentQ = Questions[QuestionNumber];
  // updating questions on panel
  var panelEl = document.getElementById("questions");
  panelEl.textContent = presentQ.title;
  // clear mcqs
  OptionsEl.innerHTML = "";
  // loop through mcqs
  Questions.Options.forEach(function (Option, i) {
    // create button for each mcq
    var OptionNode = document.createElement("button");
    OptionNode.setAttribute("class", "Option");
    OptionNode.setAttribute("value", Option);
    OptionNode.textContent = i + 1 + "." + Option;
    //add click function to each choice
    OptionNode.onclick = QClick;
    OptionsEl.appendChild(OptionNode);
  });
}

// 'if' arguments for wrong or right answers.
function QClick() {
  // penalty for wrong answers
  if (this.value !== Questions[QuestionNumber].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    // update counter
    timerEl.textContent = time;
    RightWrongEl.textContent = "Wrong!";
    RightWrongEl.style.color = "grey";
    RightWrongEl.style.fontsize = "400%";
  } else {
    RightWrongEl.textContent = "Correct!";
    RightWrongEl.style.color = "grey";
    RightWrongEl.style.fontsize = "400%";
  }
  // update screen with result
  RightWrongEl.setAttribute("class", "result");
  setTimeout(function () {
    RightWrongEl.setAttribute("class", "clear");
  }, 1000);
  // move to next question
  QuestionNumber++;
  if (QuestionNumber === Questions.length) {
    quizEnd();
  } else {
    getQuizQuestion();
  }
}
function quizEnd() {
  // countdown finished
  clearInterval(tickerId);
  // unhide finish panel
  var finishEl = document.getElementById("finish");
  finishEl.removeAttribute("class");
  // final score panel
  var finalScoreEl = document.getElementById("score!");
  finalScoreEl.textContent = time;
  // hide questions panel
  questionsEl.setAttribute("class", "hide");
}

function counter() {
  // counter refresh
  time--;
  timerEl.textContent = time;
  // 'out of time' status check
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighScore() {
  var Name = initialsEl.value.trim();
  if (Name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("HighScores")) || [];
    var ScoreUpdate = {
      score: time,
      Initials: Name,
    };
    highscores.push(ScoreUpdate);
    window.localStorage.setItem("HighScores", JSON.stringify(highscores));
  }
}
function checkForEvent(event) {
  if (event.key === "Enter") {
    saveHighScore();
  }
}

SubmitBtn.onclick = saveHighScore;
