const boxes = document.querySelectorAll(".slide__box");
const controlls = document.querySelectorAll(".controlls");
const switches = document.querySelectorAll(".current-photo");
let boxIndex = 0;

function show(index) {
    boxes[boxIndex].classList.remove('active');
    boxes[index].classList.add('active');
    switches[boxIndex].classList.remove('current');
    switches[index].classList.add('current');
    boxIndex = index;
}
controlls.forEach(control => {
    control.addEventListener('click', (event) => {
        if (event.target.classList.contains('prev')) {
            let index = boxIndex - 1;
            if (index < 0) index = boxes.length - 1;
            show(index);
        }
        if (event.target.classList.contains('next')) {
            let index = boxIndex + 1;
            if (index >= boxes.length) index = 0;
            show(index);
        }
    });
});
switches[0].classList.add('current');
show(0);