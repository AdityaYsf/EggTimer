const gridView  = document.getElementById('gridView');
const timerView = document.getElementById('timerView');

const timerDisplay = document.getElementById('timerDisplay');
const eggName      = document.getElementById('eggName');
const timerEgg     = document.getElementById('timerEgg');


const eggs = [
    { name: 'Soft Boiled',   time: 360, color: '#FFE87C' },
    { name: 'Medium Soft',  time: 420, color: '#FFD93D' },
    { name: 'Medium Hard',  time: 540, color: '#FFA500' },
    { name: 'Hard Boiled',  time: 660, color: '#FF8C00' }
];


let interval = null;
let timeLeft = 0;


function startTimer(index) {
    const egg = eggs[index];
    timeLeft = egg.time;

    /* Animasi keluar grid */
    gridView.classList.add('fade-out');

    setTimeout(() => {
        gridView.classList.add('hidden');
        gridView.classList.remove('fade-out');

        /* Tampilkan timer */
        timerView.classList.add('active', 'slide-up');

        setupTimerUI(egg);
        startCountdown();

        setTimeout(() => {
            timerView.classList.remove('slide-up');
        }, 250);

    }, 250);
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
    eggName.textContent = egg.name;

    timerEgg.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('fill', egg.color);
    });

    updateDisplay();
}

function startCountdown() {
    clearInterval(interval);

    interval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(interval);
            alert('🎉 Your egg is ready! 🥚');
            stopTimer();
        }
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

