const classActive = document.querySelectorAll('.status-active'); 
const variantButtons = document.querySelectorAll('.variants-button');
const buttonStart = document.querySelector('.start-button');
const bodyWrapStyle = document.querySelector('.body-wrap-style');
const spanTotalPrize = document.querySelector('.span-total-prize');
const winningBg = document.querySelector('.winning-bg');
const spanWinningSum = document.querySelector('.span-winning-sum');
const jackPot = document.querySelector('.jack-pot');
const prizeOfRound = document.querySelector('.span-prize-of-round');
const winningSum = document.querySelector('.winning-sum');
const two = 2;
const three = 3;
const four = 4;
const oneHundred = 100;
const oneMillion = 1000000;
let doneSum = 0;
let forRoundSum = 100;
let indexOfCorrectAnswer;
let returnQuestionsObj;

buttonStart.addEventListener('click', function () {
  bodyWrapStyle.classList.remove('body-wrap-style');
  buttonStart.classList.add('active');
  winningBg.classList.remove('active');
  jackPot.classList.remove('active');
  winningSum.classList.remove('active');
  spanTotalPrize.textContent = '0';
  prizeOfRound.textContent = '100';
  doneSum = 0;
  forRoundSum = oneHundred;
  returnQuestionsObj = JSON.parse(localStorage.getItem('myQuestionsKey'));
  classActive.forEach(el => el.classList.add('active'));
  newQuestion();
});

function newQuestion() {
  const randomIndex = [Math.floor(Math.random() * returnQuestionsObj.length)];
  const randomQuestion = returnQuestionsObj[randomIndex];
  returnQuestionsObj.splice(randomIndex, 1);
  classActive[1].innerHTML = randomQuestion['question']; //class='question'
  const variantsOfAnswer = randomQuestion['content'];
  indexOfCorrectAnswer = randomQuestion['correct'];
  variantButtons[0].innerHTML = variantsOfAnswer[0];
  variantButtons[1].innerHTML = variantsOfAnswer[1];
  variantButtons[two].innerHTML = variantsOfAnswer[two];
  variantButtons[three].innerHTML = variantsOfAnswer[three];
}

variantButtons.forEach(addListener);

function addListener(item) {
  item.addEventListener('click', checkAnswer);
}

function checkAnswer(eventObject) {
  let clickedElement = eventObject.target;
  let elementId = clickedElement.getAttribute('id');
  if (Number(elementId) === indexOfCorrectAnswer) {
    doneSum += forRoundSum;
    forRoundSum *= two;
    prizeOfRound.textContent = `${forRoundSum}`;
    spanTotalPrize.textContent = `${doneSum}`;
    if (doneSum > oneMillion) {
      changeInterface();
      jackPot.classList.add('active');
    } else {
      newQuestion();
    }
  } else {
    changeInterface()
    winningSum.classList.add('active');
    spanWinningSum.textContent = `${doneSum}`
  }
}

function changeInterface() {
  winningBg.classList.add('active');
  winningSum.classList.remove('active');
  classActive.forEach(el => el.classList.remove('active'));
}

classActive[0].addEventListener('click', function () { //class='skip-button'
  classActive[0].classList.remove('active');
  newQuestion();
});