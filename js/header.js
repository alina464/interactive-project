const btn = document.querySelector('.nav-btn');
const list = document.querySelector('.nav__list');

btn.addEventListener('click', () => {
  list.classList.toggle('active');
  btn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
     if (!e.target.closest('.hover__list')) {
    list.classList.remove('active');
    btn.classList.remove('active');
  }
})