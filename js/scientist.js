const scientists = [ 
    { 
        name: "Albert", 
        surname: "Einstein", 
        born: 1879, 
        dead: 1955, 
        img: "alberteinstein.jpg",
        id: 1 
    }, 
    { 
        name: "Isaac", 
        surname: "Newton", 
        born: 1643, 
        dead: 1727, 
        img: "isaacnewton.jpg",
        id: 2 
    }, 
    { 
        name: "Galileo", 
        surname: "Galilei", 
        born: 1564, 
        dead: 1642, 
        img: "galileogalilei.jpg",
        id: 3 
    }, 
    { 
        name: "Marie", 
        surname: "Curie", 
        born: 1867, 
        dead: 1934, 
        img: "mariecurie.jpg",
        id: 4 
    }, 
    { 
        name: "Johannes", 
        surname: "Kepler", 
        born: 1571, 
        dead: 1630, 
        img: "johanneskepler.jpg",
        id: 5 
    }, 
    { 
        name: "Nikolaus", 
        surname: "Copernikus", 
        born: 1473, 
        dead: 1543, 
        img: "nikolauscopernikus.jpg",
        id: 6 
    }, 
    { 
        name: "Max", 
        surname: "Planck", 
        born: 1858, 
        dead: 1947, 
        img: "maxplanck.png",
        id: 7 
    }, 
    { 
        name: "Katharine", 
        surname: "Blodgett", 
        born: 1898, 
        dead: 1979, 
        img: "katharineblodgett.jpg",
        id: 8 
    }, 
    { 
        name: "Ada", 
        surname: "Lovelace", 
        born: 1815, 
        dead: 1852, 
        img: "adalovelace.jpg",
        id: 9 
    }, 
    { 
        name: "Sarah", 
        surname: "Goode", 
        born: 1855, 
        dead: 1905, 
        img: "sarahgoode.jpeg",
        id: 10 
    }, 
    { 
        name: "Lise", 
        surname: "Meitner", 
        born: 1878, 
        dead: 1968, 
        img: "lisemeitner.png",
        id: 11 
    }, 
    { 
        name: "Hanna", 
        surname: "Hammarström", 
        born: 1829, 
        dead: 1909, 
        img: "hannahammarström.png",
        id: 12 
    } 
];

const images = document.querySelectorAll(".scientist__photos-item");
const buttons = document.querySelectorAll(".scientist__category-button");


function renderScientist(list) {
    images.forEach((img, index) => {
        const scientist = list[index];
        // у кожного науковця з масиву ліст свій індекс
        if (!scientist) {
            img.style.display = "none";
            return;
        }
            img.style.display = "block";
            img.src = `./img/${scientist.img}`; 
            img.alt = `${scientist.name} ${scientist.surname}`;
        });
};

buttons[0].addEventListener('click', () => {
    clearScientistInfo();
    const born19c = scientists.filter((scientist) =>  scientist.born >= 1801 && scientist.born <= 1900 );
    renderScientist(born19c);

});

buttons[1].addEventListener('click', () => {
    clearScientistInfo();
    const sortedByAlphabet = [...scientists].sort((a, b) => a.surname.localeCompare(b.surname));
    renderScientist(sortedByAlphabet);
});
buttons[2].addEventListener('click', () => {
    clearScientistInfo();
    const sortedByLife = [...scientists].sort((a, b) => (b.dead - b.born) - (a.dead - a.born));
    renderScientist(sortedByLife);

});

buttons[3].addEventListener('click', () => {
    clearScientistInfo();
    const sortedYoungest = [...scientists].sort((a, b) => b.born - a.born);
    const youngestScientist = sortedYoungest[0];

    renderScientist([youngestScientist]);
});
function showBornYear(year) {
    const oldText = document.querySelector('.scientist-year');
    if (oldText) oldText.remove();

    const bornText = document.createElement('p');
    bornText.classList.add('scientist-year');
    bornText.textContent = `Рік народження Ейнштейна: ${year}`;
    bornText.style.fontFamily = "Montserrat Alternates";

    const einsteinImg = document.querySelector('.scientist__photos img');
    einsteinImg.after(bornText);
}
buttons[4].addEventListener('click', () => {
    clearScientistInfo();
    const einstein = scientists.find((scientist) => scientist.surname === "Einstein");
    renderScientist([einstein]);
    showBornYear(einstein.born);
});
function clearScientistInfo() {
    const info = document.querySelector('.scientist-year');
    if (info) info.remove();
};
buttons[5].addEventListener('click', () => {
    clearScientistInfo();
    const scientistsWithC = scientists.filter((scientist) => scientist.surname.startsWith("C"));
    renderScientist(scientistsWithC);
});
buttons[6].addEventListener('click', () => {
    clearScientistInfo();
    const scientistsWithoutA = scientists.filter((scientist) => !scientist.name.startsWith("A"));
    renderScientist(scientistsWithoutA);
});
buttons[7].addEventListener('click', () => {
    clearScientistInfo();
    const sortedByLife = [...scientists].sort((a, b) => (b.dead - b.born) - (a.dead - a.born));

    const longest = sortedByLife[0];
    const shortest = sortedByLife.at(-1);

    renderScientist([longest, shortest]);
});
buttons[8].addEventListener('click', () => {
    clearScientistInfo();
    const sameLetters = scientists.filter((scientist) => scientist.name[0] === scientist.surname[0]);
    renderScientist(sameLetters)
});