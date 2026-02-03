const ball = document.querySelector('#interactive-ball');
const box = document.querySelector('.football__box');
let speedx = 0;
let speedy = 0;
let x = 90;
let y = 10;


ball.addEventListener('click', (event) => {
  const ballInfo = ball.getBoundingClientRect();
  console.log(ballInfo);

  const centerX = ballInfo.left + ballInfo.width / 2;
  const centerY = ballInfo.top + ballInfo.height / 2;

  const dx = centerX - event.clientX; 
  const dy = centerY - event.clientY;
//   мінус куди клікнути мишкоюб, чим далі від центра тим більше швидкість м'яча
  speedx = dx * 0.2;
  speedy = dy * 0.2;
});

function animate() {
  x += speedx;
  y += speedy;
  if (x + ball.clientWidth > box.clientWidth) { 
    x = box.clientWidth - ball.clientWidth;
    speedx = -speedx;
  }
  if (x < 0) { 
    x = 0;
    speedx = -speedx;
  }
  if (y + ball.clientHeight > box.clientHeight) {
    y = box.clientHeight - ball.clientHeight;
    speedy = -speedy;
  }
  if (y < 0) {
    y = 0;
    speedy = -speedy;
  }
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
  speedx *= 0.99;
  speedy *= 0.99;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);