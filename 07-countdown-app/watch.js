document.addEventListener('DOMContentLoaded', () => {
    const timerDive = document.querySelector('.timer');
    const button = document.querySelector('#btn');
    const input = document.querySelector('#input');
    const clock = document.querySelector('.clock');

    let countdownInterval;

    function checkEnter(e) {
        if (e.key === 'Enter') {
            console.log("Enter pressed");
            if (countdownInterval) clearInterval(countdownInterval);
            startCountdown();
        }
    }

    function startCountdown() {
        const lastDate = new Date(input.value);

        if (isNaN(lastDate) || lastDate <= new Date()) {
            alert("Please enter a valid future date.");
            return;
        }

        countdownInterval = setInterval(() => {
            const currentDate = new Date();
            const timeLeft = lastDate.getTime() - currentDate.getTime();

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                timerDive.textContent = "Time's up!";
                return;
            }

            let years = lastDate.getFullYear() - currentDate.getFullYear();
            if (
                lastDate.getMonth() < currentDate.getMonth() ||
                (lastDate.getMonth() === currentDate.getMonth() &&
                lastDate.getDate() < currentDate.getDate())
            ) {
                years--;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) % 365;
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            const output = `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;

            timerDive.textContent = output;
            console.log(output);
        }, 1000);
    }

    input.addEventListener('keypress', checkEnter);
});
