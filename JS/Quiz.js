const MyBtn = document.querySelector(`.MyBtn button`);
const RulesBox = document.querySelector(`.RulesBox`);
const MyQuizApp = document.querySelector(`.MyQuizApp`);
const ExitButton = document.querySelector(`.Buttons .ExitButton`);
const ContinueButton = document.querySelector(`.Buttons .ContinueButton`);
const Question = document.querySelector(`.Question`);
let OptionList = document.querySelector(`.MyOptions`);
const TimeCount = document.querySelector(`.TimeCount .Seconds`);
const TimeLine = document.querySelector(` .TimeLine`);
const ResultBox = document.querySelector(`.ResultBox`);
const Restart = document.querySelector(`.buttons .Restart`);
const Quit = document.querySelector(`.buttons .Quit`);
// Go to second pag
MyBtn.onclick = () => {
  RulesBox.classList.add(`ActiveInfo`);
};
// back to firt page
ExitButton.onclick = () => {
  RulesBox.classList.remove(`ActiveInfo`);
};
// Go to third or Question page
ContinueButton.onclick = () => {
  RulesBox.classList.remove(`ActiveInfo`);
  Question.classList.add(`ActiveQuiz`);
  showQuestion(que_count);
  startTimer(TimeValue);
  startTimeLine(0);
  NextBtn.style.display = `none`;
};
const NextBtn = document.querySelector(`.NextBtn`);

Restart.onclick = () => {
  // aikhne akta prblm ase .solve korte pri nai
  let que_count = 0;
  let widthValue = 0;
  userScore = 0;
  RulesBox.classList.remove(`ActiveInfo`);
  ResultBox.classList.remove(`activeResultBox`);
  Question.classList.add(`ActiveQuiz`);
  showQuestion(que_count);
  clearInterval(counter);
  startTimer(TimeValue);
  clearInterval(counterLine);
  startTimeLine(widthValue);
  NextBtn.style.display = `none`;
};
// Quze suru theke sure korte
Quit.onclick = () => {
  window.location.reload();
};
// variable declare
let que_count = 0;
let counter;
let TimeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;
NextBtn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    showQuestion(que_count);
    clearInterval(counter);
    startTimer(TimeValue);
    clearInterval(counterLine);
    startTimeLine(widthValue);
    TimeLine.style.backgroundColor = `rgb(65, 144, 223)`;
  } else {
    console.log(`You have completed your task🥰.`);
    showResultBox();
  }
  NextBtn.style.display = `none`;
};
// DINAMICALLY QUESTIONS AND OPTION SHOW
function showQuestion(index) {
  // show question dinamically
  const queText = document.querySelector(`.Question .text`);

  //   show option dinamically
  let OptionList = document.querySelector(`.MyOptions`);
  const OptionTag =
    ` <div class="options">` +
    questions[index].options[0] +
    `<span><span></div>` +
    ` <div class="options">` +
    questions[index].options[1] +
    `<span><span></div>` +
    ` <div class="options">` +
    questions[index].options[2] +
    `<span><span></div>` +
    ` <div class="options">` +
    questions[index].options[3] +
    `<span><span></div>`;
  const queTag =
    ` <span>` +
    questions[index].numb +
    `` +
    `.` +
    questions[index].question +
    `</span>`;
  queText.innerHTML = queTag;
  OptionList.innerHTML = OptionTag;
  //    show total questin dinamically
  const TotalQue = document.querySelector(`.TotalQue`);
  const TotalQueTag =
    ` <div><span>` + questions[index].numb + ` of 5 Question</span></div>`;
  TotalQue.innerHTML = TotalQueTag;
  //  OPTION SELECT AREA
  const option = OptionList.querySelectorAll(`.options`);
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute(`onclick`, `optionSelected(this)`);
  }
}
let tickIcon = `<div class="tickIcon"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="crossIcon"><i class="fas fa-times"></i></div> `;
// option correct or wrong check
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent; //AI JAIGAR ANSWER TA FUNCTION ER PARAMETTER
  let correctAns = questions[que_count].answer; //AI JAIGAR ANSWER QUESTION FILE ER
  let alloptions = OptionList.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    answer.classList.add(`correct`);
    console.log(`your answer is correct`);
    answer.insertAdjacentHTML(`beforeend`, tickIcon);
  } else {
    answer.classList.add(`incorrect`);
    console.log(`your answer is wrong`);
    answer.insertAdjacentHTML(`beforeend`, crossIcon);

    // vul hole sothik ta dekhiye dibe
    for (let i = 0; i < alloptions; i++) {
      if (OptionList.children[i].textContent == correctAns) {
        OptionList.children[i].setAttribute(`class`, `options correct`);
        OptionList.children[i].insertAdjacentHTML(`beforeend`, tickIcon);
      }
    }
  }

  // answer jate aka dik bar select korte na  pre
  for (let i = 0; i < alloptions; i++) {
    OptionList.children[i].classList.add(`disabled`);
  }
  NextBtn.style.display = `block`;
}

// show Result page
function showResultBox() {
  ResultBox.classList.add(`activeResultBox`); //add result page
  const ScoreText = document.querySelector(`.ScoreText`);
  if (userScore > 3) {
    let ScoreTag =
      ` <span>Congratulation on🥰 You Got <p>` +
      userScore +
      `</p> Out of <p>` +
      questions.length +
      `</p></span>`;

    ScoreText.innerHTML = ScoreTag;
  } else if (userScore > 1) {
    let ScoreTag =
      ` <span>Carry on👍 You Got <p>` +
      userScore +
      `</p> Out of <p>` +
      questions.length +
      `</p></span>`;

    ScoreText.innerHTML = ScoreTag;
  } else {
    let ScoreTag =
      ` <span>Sorry😔 You Got <p>` +
      userScore +
      `</p> Out of <p>` +
      questions.length +
      `</p></span>`;

    ScoreText.innerHTML = ScoreTag;
  }
}

// Time show
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    TimeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = TimeCount.textContent;
      TimeCount.textContent = `0` + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      TimeCount.textContent = `00`;
      let correctAns = questions[que_count].answer; //AI JAIGAR ANSWER QUESTION FILE ER
      let alloptions = OptionList.children.length;
      for (let i = 0; i < alloptions; i++) {
        if (OptionList.children[i].textContent == correctAns) {
          OptionList.children[i].setAttribute(`class`, `options correct`);
          OptionList.children[i].insertAdjacentHTML(`beforeend`, tickIcon);
        }
      }
      for (let i = 0; i < alloptions; i++) {
        OptionList.children[i].classList.add(`disabled`);
      }
      NextBtn.style.display = `block`;
    }
  }
}
// TimeLine show
function startTimeLine(time) {
  counterLine = setInterval(timer, 47);
  function timer() {
    time += 1;
    TimeLine.style.width = time + `px`;
    if (time > 289) {
      clearInterval(counterLine);
    }
  }
}
