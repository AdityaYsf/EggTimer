const gridView  = document.getElementById('gridView');
const timerView = document.getElementById('timerView');

const timerDisplay = document.getElementById('timerDisplay');
const eggName      = document.getElementById('eggName');
const timerEgg     = document.getElementById('timerEgg');
const beepSound    = new Audio('assets/sound/Alarm.mp3');


const eggs = [
    { name: 'Soft Boiled',   time: 360, color: '#FFE87C', img: 'assets/img/Soft Boiled.png' },
    { name: 'Medium Soft',  time: 420, color: '#FFD93D', img: 'assets/img/Medium Soft.png' },
    { name: 'Medium Hard',  time: 540, color: '#FFA500', img: 'assets/img/Medium Hard.png' },
    { name: 'Hard Boiled',  time: 660, color: '#FF8C00', img: 'assets/img/Hard Boiled.png' }
];


let timerInterval = null;
let remainingTime = 0;
let beepInterval = null;

function setupTimer(index) {
  clearInterval(timerInterval)

  const egg = eggs[index]
  remainingTime = egg.time

  setupTimerUI(egg)

  timerInterval = setInterval(() => {
    remainingTime--
    updateDisplay()

    if (remainingTime <= 0) {
      clearInterval(timerInterval)
      eggFinishAnimation()
    }
  }, 1000)
}


function startTimer(index) {
  console.log('Selected egg:', index)

  const egg = document
    .querySelectorAll('.egg-card')[index]
    .querySelector('.pixel-egg')

  egg.classList.add('egg-bounce')

  setTimeout(() => {
    egg.classList.remove('egg-bounce')
  }, 350)

  setTimeout(() => {
    gridView.classList.add('fade-out')

    setTimeout(() => {
      gridView.classList.add('hidden')
      gridView.classList.remove('fade-out')

      timerView.classList.add('active', 'slide-up')

      setupTimer(index)

      setTimeout(() => {
        timerView.classList.remove('slide-up')
      }, 250)
    }, 250)
  }, 200)
}




function stopTimer() {
  // animasi keluar timer
  timerView.classList.add('slide-down')

  setTimeout(() => {
    timerView.classList.remove('active', 'slide-down')

    // tampilkan grid lagi
    gridView.classList.remove('hidden')
    gridView.classList.add('fade-in')

    setTimeout(() => {
      gridView.classList.remove('fade-in')
    }, 250)
  }, 250)

  // stop logic timer kamu di sini
  clearInterval(timerInterval)
}



function setupTimerUI(egg) {
  eggName.textContent = egg.name
  timerEgg.src = egg.img

  updateDisplay()
}

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  timerDisplay.textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`
}


function eggFinishAnimation() {
  clearInterval(timerInterval)

  const egg = document.getElementById('timerEgg')
  const crack = document.getElementById('eggCrack')

  // 1. Shake dulu
  egg.classList.add('shake')

  // 2. Munculin crack
  setTimeout(() => {
    crack.style.opacity = 1
  }, 400)

  // 3. Pecah
  setTimeout(() => {
    egg.classList.remove('shake')
    egg.classList.add('egg-burst')
    crack.style.opacity = 0
  }, 800)

  // 4. Mulai beep looping
  beepSound.currentTime = 0
  beepSound.play()

  beepInterval = setInterval(() => {
    beepSound.currentTime = 0
    beepSound.play()
  }, 1000)

  // 5. Popup muncul
  setTimeout(() => {
    document.getElementById('finishPopup').classList.add('active')
  }, 1200)
}



function closePopup() {
  clearInterval(beepInterval)
  beepSound.pause()
  beepSound.currentTime = 0

  const egg = document.getElementById('timerEgg')
  egg.classList.remove('egg-burst')
  egg.style.transform = ''
  egg.style.opacity = 1

  document.getElementById('finishPopup').classList.remove('active')
  stopTimer()
}


