let numberCheck = document.querySelector('#number');
let buttonNumber = document.querySelector('#check-number');
const random = Math.floor(Math.random() * 100 + 1);
console.log(random);
let attempts = 0; 
buttonNumber.addEventListener('click', () => {
    const number = Number(numberCheck.value);
    attempts++;

    const resultNumber = document.createElement('p');
    resultNumber.classList.add('result-number');
    const oldNumberResult = document.querySelector('.result-number');
    if (oldNumberResult){
         oldNumberResult.remove();
    }
    if (number === random) {
        resultNumber.textContent = `Вітаю, ви вгадали число! ${random}. Кількість спроб: ${attempts}`;
        resultNumber.style.color = 'rgba(3, 153, 0, 1)';
        buttonNumber.disabled = true;
        resultNumber.style.fontSize = '12px';
    }
    else if (number > random) {
        resultNumber.textContent = "Загадане число менше";
        resultNumber.style.color = 'rgba(153, 0, 0, 1)';
        resultNumber.style.fontSize = '12px';
    }
    else {
        resultNumber.textContent = "Загадане число більше";
        resultNumber.style.color = 'rgba(153, 0, 0, 1)';
        resultNumber.style.fontSize = '12px';
    }
    if (attempts >= 12 && number !== random) {
        resultNumber.textContent = `Ви використали 12 спроб. Загадане число було ${random}`;
        resultNumber.style.color = 'gray';
        buttonNumber.disabled = true;
    }
    numberCheck.after(resultNumber)
}) ;
