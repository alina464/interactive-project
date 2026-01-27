let modal = document.querySelector('#myModal');
let buttonSend = document.querySelector('.body__modal-send');
let buttonClose = document.querySelector('.body__modal-close');
let userName = document.querySelector('#user-name');
let inputUserName = document.querySelector('#input-user-name');

window.addEventListener('load', () => {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
});

buttonClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
});

buttonSend.addEventListener('click', () => {
    const name = inputUserName.value.trim();
    if(name !== '') {
        userName.textContent = `Вітаємо, ${name}!`;
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll')
    }
});