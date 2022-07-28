// DOM Elements
var timerEl = document.querySelector("#tik-tok");
var startEl = document.querySelector("#startBtn");
var questionsEl = document.querySelector("#QuizQList");
var OptionsEl = document.querySelector("#Options");
var RightWrongEl = document.querySelector("#result");
var initialsEl = document.querySelector("#Name");
var submitEl = document.querySelector("#submitBtn");

// quiz timer stat
var QuestionNumber = 0;
var time = question.length * 10;
var tickerId;

function Begin() {
  // hide intro panel
  var introEl = document.getElementById("#introPanel");
  introEl.setAttribute("class", "hide");
  // unhide quiz questions panel
  questionsEl.removeAttribute("class");
  // start countdown
  tickerId = setInterval(counter, 1000);
  timerEl.textContent = time;
  getQuizQuestion();
}

// array/list of questions, multiple choices and answers
var QList = [
  {
    Q: "Who is making the Web standards?",
    Options: [
      "The World Wide Web Consortium",
      "Mozilla",
      "Google",
      "Microsoft",
    ],
    A: "The World Wide Web Consortium",
  },
  {
    Q: "Which character is used to indicate as end tag?",
    Options: ["<", "^", ";", "/"],
    A: "/",
  },
  {
    Q: "Inside which HtML element do we put the JavaScript?",
    Options: ["<scripting>", "<script>", "<javascript>", "<js>"],
    A: "<script>",
  },
  {
    Q: "Which operator is used to assign a value to a variable?",
    Options: ["=", "*", "-", "x"],
    A: "=",
  },
  {
    Q: "What does css stand for?",
    Options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Colourful Style Sheets",
    ],
    A: "cascading Style Sheets",
  },
];

function getQuizQuestion() {
  // get question from array
  var question = QList[QuestionNumber];
  // updating questions on panel
  var panelEl = document.getElementById("QuizQ");
  panelEl.textContent = newQ.title;
  // clear mcqs
  OptionsEl.innerHTML = "";
  // loop through mcqs
  question.Options.forEach(function (Option, i) {
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
  if (this.value !== QList[QuestionNumber].answer) {
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
  if (QuestionNumber === question.length) {
    quizEnd();
  } else {
    getQuizQuestion();
  }
}
function quizEnd() {
  // countdown finished
  clearInterval(tickerId);
  // hide questions panel
  questionsEl.setAttribute("class", "hide");
  // unhide finish panel
  var finishEl = document.getElementById("finish");
  finishEl.removeAttribute("class");
  // final score panel
  var finalScoreEl = document.getElementById("score!");
  finalScoreEl.textContent = time;
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
function printHighScores() {
  var HighScores = JSON.parse(window.localStorage.getItem("HighScores")) || [];
  // sorting HighScores
  HighScores.sort(function (a, b) {
    return b.score - a.score;
  });
  HighScores.forEach(function (score) {
    var scorelist = document.createElement("li");
    li.textContent = score.initials + "-" + score.score;
    var olEl = document.getElementById("HighScores");
    olEl.appendChild(scorelist);
  });
}
function clearHighScores() {
  window.localStorage.removeItem("HighScores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighScores;

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
startBtn.onclick = StartQuiz;
