let firstNumber = document.querySelector("#three__numbers-first");
let secondNumber = document.querySelector("#three__numbers-second");
let thirdNumber = document.querySelector("#three__numbers-third");
let threeNumbersText = document.querySelector(".three-numbers-text");
let btnNumbersCheck = document.querySelector("#three__numbers-check");
btnNumbersCheck.addEventListener('click', () => {
    const numbers = [
        firstNumber.value,
        secondNumber.value,
        thirdNumber.value
    ];
    if (numbers.includes("")) {
        alert("заповніть всі поля");
        return;
    }
    const nums = numbers.map(Number); 
    // меп зробив новий масив з чисел

    if (nums.some(isNaN)) {
        alert("введіть число");
        return;
    }
    // перевірка чи це точно числа чи було введено букви

    const oldNumbersResult = document.querySelector('.result-three-numbers');
    if (oldNumbersResult) {
        oldNumbersResult.remove();
    }
    const resultNumbers = document.createElement('p');
    resultNumbers.classList.add('result-three-numbers');
    resultNumbers.textContent = Math.max(...nums);
    threeNumbersText.after(resultNumbers);
    if (nums[0] === nums[1] && nums[1] === nums[2]) {
        const same = document.createElement('p');
        same.textContent = "Ви ввели однакові числа";
        threeNumbersText.after(same);
    }
});