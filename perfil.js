document.addEventListener("DOMContentLoaded", function () {
    // Data de término do temporizador (10 dias a partir de agora)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);

    // Atualiza o temporizador a cada segundo
    const intervalId = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date();
        const difference = endDate - now;

        // Calcula os dias, horas, minutos e segundos restantes
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Atualiza os elementos HTML com os contadores separados
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        // Verifica se o temporizador chegou a 0 e limpa o intervalo
        if (difference <= 0) {
            clearInterval(intervalId);
            document.getElementById("countdown").textContent = "Em Breve";
        }
    }
});
