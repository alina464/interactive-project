let birthdayYear = document.querySelector('#year');
let birthdayBox = document.querySelector('#year-box');
let buttonYear = document.querySelector('#check-year');

buttonYear.addEventListener('click', () => {
    const year = Number(birthdayYear.value);
    if (year === 0) {
        alert('Введіть рік народження');
        return;
    }
    const resultYear = document.createElement('p');
    resultYear.classList.add('result');
    const oldYearResult = document.querySelector('.result');
    if (oldYearResult) {
        oldYearResult.remove();
    }
    if (year % 4 === 0) {
        resultYear.textContent = 'Ви народилися у високосний рік!';
        resultYear.style.color = 'rgba(3, 153, 0, 1)';
        resultYear.style.fontSize = '12px';
    } else {
        resultYear.textContent = 'Ви народилися у невисокосний рік!';
        resultYear.style.color = 'rgba(153, 0, 0, 1)';
        resultYear.style.fontSize = '12px';
    }
    birthdayYear.after(resultYear);
});
