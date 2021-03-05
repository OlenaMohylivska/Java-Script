const table = document.querySelector('.table');

table.addEventListener('click', changeColor);

function changeColor(el) {
    const currentEl = el.target;
    
    if(currentEl.className === 'cell') {
        currentEl.style.backgroundColor = 'yellow';

    } else if(currentEl.classList.contains('firstCol')) {
        const parent = currentEl.parentNode;
        parent.style.backgroundColor = 'blue';

    } else if(currentEl.classList.contains('special')) {
        table.style.backgroundColor = 'green';
    }  
}

const input = document.querySelector('.input');
const fail = document.querySelector('.fail');
const success = document.querySelector('.success');
const button = document.querySelector('.button');

input.oninput = function () {
    const regExp = /^\+380[0-9]{9}$/;
    button.disabled = true;

    if (!regExp.test(input.value)) {
        fail.classList.add('active');
        input.classList.add('border-red');
        success.classList.remove('active');

    } else {
        fail.classList.remove('active');
        input.classList.remove('border-red');
        button.disabled = false;
        button.addEventListener('click', function () {
            success.classList.add('active');
        })
    }
}

const two = 2;
const five = 5;
const twenty = 20;
const oneHubdredThirtyEight = 138;
const oneHundredFiftyThree = 153;
const fiveHundredForty = 540;
const fiveHundredFiftyFive = 555;
const threeThousand = 3000;

const ball = document.querySelector('.ball');
const court = document.querySelector('.court');
const teamA = document.querySelector('.team-A');
const teamB = document.querySelector('.team-B');
const messageContainer = document.querySelector('.message');
let scoreA = 0;
let scoreB = 0;

court.addEventListener('click', function(event) {

    if (event.target.className === 'ball') {

        return;
    }

    ball.style.top = `${event.offsetY - twenty}px`;
    ball.style.left = `${event.offsetX - twenty}px`;

    let topNumb = ball.style.top.substring(0, ball.style.top.length - two);
    let leftNumb = ball.style.left.substring(0, ball.style.left.length - two);

    topNumb = Number(topNumb);
    leftNumb = Number(leftNumb);

    if (topNumb >= oneHubdredThirtyEight &&
        topNumb <= oneHundredFiftyThree &&
        leftNumb >= five &&
        leftNumb <= twenty) {

        scoreB += 1;
        teamB.innerHTML = scoreB;
        message('A', scoreA, scoreB);

    } else if (topNumb >= oneHubdredThirtyEight &&
        topNumb <= oneHundredFiftyThree &&
        leftNumb >= fiveHundredForty &&
        leftNumb <= fiveHundredFiftyFive) {

        scoreA += 1;
        teamA.innerHTML = scoreA;
        message('B', scoreA, scoreB);
    }
})

court.addEventListener('scoreChanged', function (e) {
    teamA.textContent = e.detail.scoreA;
    teamB.textContent = e.detail.scoreB;
})

function message(team, A, B) {
    const event = new CustomEvent('scoreChanged', {
        detail: {
            scoreA: A,
            scoreB: B
        }
    });

    court.dispatchEvent(event);
    messageContainer.classList.add('active');
    messageContainer.innerHTML = `Team ${team} scored the goal!<br>Current score ${A}:${B}`;
    function removeMessage() {
        messageContainer.classList.remove('active');
        ball.style.top = '145px';
        ball.style.left = '280px';
    }

    setTimeout(removeMessage, threeThousand);
}