const input = document.querySelector('input[type="range"]');
const rangeText = document.querySelector('.range-text');
const gridContainer = document.querySelector('.grid-container');
const colorButton = document.querySelector('#color');
const clrButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');

let isPainting = false;
let color = null;
let curMode = null;

clrButton.addEventListener('click', (e) => {
    e.target.classList.add('active');

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = 'white';
    });

    setTimeout(() => {
        alert('canvas has been clean!');
        e.target.classList.remove('active');
    }, 300);
});

eraseButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) {
        curMode = null;
        e.target.classList.remove('active');
    } else {
        curMode = 'erase';
        e.target.classList.add('active');
    }
});

colorButton.addEventListener('change', (e) => {
    color = e.target.value;
    console.log(color);
});

gridContainer.addEventListener('mousedown', () => isPainting = true);
gridContainer.addEventListener('mouseup', () => isPainting = false);
gridContainer.addEventListener('mouseleave', () => isPainting = false);
gridContainer.addEventListener('mouseover', (e) => {
    if (isPainting && e.target.classList.contains('grid-item') && curMode != 'erase') {
        e.target.style.backgroundColor = color ?? '#333';
    }

    if (isPainting && curMode == 'erase') {
        e.target.style.backgroundColor = 'white';
    }
});

input.addEventListener('input', e => {
    let value = e.target.value;
    rangeText.textContent = `${value} x ${value}`;

    createGrid(value, value);
});

function createGrid(rows, cols) {
    gridContainer.innerHTML = '';

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridContainer.appendChild(gridItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    input.value = 2;
    colorButton.value = '#333';
    createGrid(2, 2);
});