let time = document.querySelector("#time");
let checkTimeBtn = document.querySelector("#check-time");
let timeResult = document.querySelector("#calculator-of-time-result")

checkTimeBtn.addEventListener('click', () => {
    const minutes = Number(time.value);
    if (isNaN(minutes) || minutes < 0) {
        alert("Введіть кількість хвилин");
        return;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    timeResult.textContent = `${hours}:${mins}`;
});