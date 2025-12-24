const eggs = [
            { name: 'Soft Boiled', time: 360, color: '#FFE87C' },
            { name: 'Medium Soft', time: 420, color: '#FFD93D' },
            { name: 'Medium Hard', time: 540, color: '#FFA500' },
            { name: 'Hard Boiled', time: 660, color: '#FF8C00' }
        ];

        let interval;
        let timeLeft = 0;

        function startTimer(index) {
            const egg = eggs[index];
            timeLeft = egg.time;

            document.getElementById('gridView').classList.add('hidden');
            document.getElementById('timerView').classList.add('active');
            document.getElementById('eggName').textContent = egg.name;

            const eggSvg = document.getElementById('timerEgg');
            eggSvg.querySelectorAll('rect').forEach(rect => {
                rect.setAttribute('fill', egg.color);
            });

            updateDisplay();
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

        function stopTimer() {
            clearInterval(interval);
            document.getElementById('gridView').classList.remove('hidden');
            document.getElementById('timerView').classList.remove('active');
        }

        function updateDisplay() {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            document.getElementById('timerDisplay').textContent = 
                `${mins}:${secs.toString().padStart(2, '0')}`;
        }