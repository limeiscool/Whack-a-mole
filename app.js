const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
const startButton = document.querySelector('#start')
const resetButton = document.querySelector('#reset')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent
let timerID
let moleID
let isRunning = false

function randomSquare() {
  square.forEach(className => {
    className.classList.remove('mole')
  })
  let randomPosition = square[Math.floor(Math.random()*9)]
  randomPosition.classList.add('mole')

  //assign randomPosition ID to hit position to use later
  hitPosition = randomPosition.id
}

square.forEach(id => {
  id.addEventListener('mousedown', () => {
    if (id.id === hitPosition) {
      result += 1
      score.textContent = result
    }
  })
  id.addEventListener('touchstart', () => {
    if (id.id === hitPosition) {
      result += 1
      score.textContent = result
    }
  })
})

function moveMole() {
  moleID = setInterval(randomSquare, 450)
}


function countDown() {
  currentTime--
  timeLeft.textContent = currentTime
  if (currentTime === 0) {
    clearInterval(timerID)
    clearInterval(moleID)
    isRunning = false
    alert('GAME OVER! Your score is ' + result)
    square.forEach(className => {
      className.classList.remove('mole')
    })
    result = 0
    score.textContent = 0
    timeLeft.textContent = 60
  }
  
}

const startGame = () => {
  if (isRunning) return;
  isRunning = true
  result = 0
  currentTime = 60
  score.textContent = result
  clearInterval(timerID)
  moveMole()
  timerID = setInterval(countDown, 1000)
  
}
startButton.addEventListener('click', startGame)

const resetGame = () => {
  if (isRunning == false) return;
  isRunning = false
  clearInterval(timerID)
  clearInterval(moleID)
  square.forEach(className => {
    className.classList.remove('mole')
  })
  score.textContent = 0
  timeLeft.textContent = 60
  alert('Game was Stopped. Score: ' + result)
  result = 0
}
resetButton.addEventListener('click', resetGame)

let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
