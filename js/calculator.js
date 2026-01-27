let buttonPlus = document.querySelector('#operation-plus');
let buttonMultiply = document.querySelector('#operation-multiply');
let buttonMinus = document.querySelector('#operation-minus');
let buttonDivide = document.querySelector('#operation-divide');
let firstNumber = document.querySelector('#first-number');
let secondNumber = document.querySelector('#second-number');
let calculatorResult = document.querySelector('#calculator-result');
let calculatorButton = document.querySelector('.calculator__inner-result');

const add = (a, b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    return 'Помилка: на нуль ділити не можна!';
  }
  return a / b;
};
const calculate = (operation) => {
  const a = Number(firstNumber.value);
  const b = Number(secondNumber.value);

  const oldResultCalculator = document.querySelector('.result-calculator');
  if (oldResultCalculator) {
    oldResultCalculator.remove();
  }

  const result = operation(a, b);

  const resultCalculator = document.createElement('p');
  resultCalculator.classList.add('result-calculator');
  resultCalculator.textContent = result;
  resultCalculator.style.color = 'rgba(126, 126, 126, 1)';
  resultCalculator.style.fontSize = '12px';
  resultCalculator.style.padding = '10px 20px';
  resultCalculator.style.backgroundColor = 'rgba(215, 215, 215, 1)';
  resultCalculator.style.borderRadius = '20px';


  calculatorButton.after(resultCalculator);
  calculatorResult.style.display = 'none';
};
buttonPlus.addEventListener('click', () => calculate(add));
buttonMinus.addEventListener('click', () => calculate(subtract));
buttonMultiply.addEventListener('click', () => calculate(multiply));
buttonDivide.addEventListener('click', () => calculate(divide));
