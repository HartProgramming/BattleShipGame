
/* Select all elements from html file */
/* body selector allows for appending and removing sections from html */
const body = document.querySelector('body');
/* turn is the textContent in the header that allows for the user to see
the status of the game */
const turn = document.querySelector("#turn");

/* rotateBtn is a button that rotates the ships verticaly or horizontally */
const rotateBtn = document.createElement('button');
rotateBtn.setAttribute('id', 'rotate-img')
/* gameboardSection is the primary section in which the game takes place
this section handles the transition between playerBoard and computerBoard */
const gameboardSection = document.querySelector("#gameboard");
const computerBoard = document.querySelector('#computerboard');
const playerBoard = document.querySelector('#playerboard');
/* the header contains turn, imgs, and btns; it is used to append and remove
elements at different times in the game */
const header = document.querySelector('header');
/* imgDiv is contained within the header section and appends and removes different 
imgs at different points in the game */
const imgDiv = document.querySelector('#img-div');
/* btnsDiv is contained within the header section and appends and removes
different buttons at different times in the game */
const btnsDiv = document.querySelector('#buttons-div');
/* startGame is a button within the btnsDiv that is appended after player and computer have
locked all their ships into place, when clicked it initiates the start of the game */
const startGame = document.createElement('button');
startGame.setAttribute('id', 'start-game');
const lockShips = document.createElement('button');
lockShips.setAttribute('id', 'lock-ships');
const restartBtn = document.createElement('button');
restartBtn.setAttribute('id', 'restart-button');
const shipStatus = document.createElement('h3');
shipStatus.setAttribute('id', 'ship-status');
const carrier = document.createElement('div');
const destroyer = document.createElement('div');
const cruiser = document.createElement('div');
const submarine = document.createElement('div');
carrier.setAttribute('id', 'carrier');
destroyer.setAttribute('id', 'destroyer');
cruiser.setAttribute('id', 'cruiser');
submarine.setAttribute('id', 'submarine');
cruiser.classList.add('cruiser-ship');
submarine.classList.add('submarine-ship');
destroyer.classList.add('destroyer-ship');
carrier.classList.add('carrier-ship');

const carrierDiv = document.createElement('div');
const destroyerDiv = document.createElement('div');
const submarineDiv = document.createElement('div');
const cruiserDiv = document.createElement('div');
const standardBox = document.querySelectorAll('.standard-box');
carrierDiv.classList.add('ships-selector');
destroyerDiv.classList.add('ships-selector');
cruiserDiv.classList.add('ships-selector');
submarineDiv.classList.add('ships-selector');
imgDiv.append(carrierDiv);
imgDiv.append(destroyerDiv);
imgDiv.append(cruiserDiv);
imgDiv.append(submarineDiv);


/* Creates the four different ships */
function createShip(ship, size, shipDiv) {
    for (let i = 0; i < size; i++) {
        div = document.createElement('div')
        ship.append(div);
    }
    ship.setAttribute('draggable', 'true');
    shipDiv.append(ship)
}

createShip(carrier, 4, carrierDiv)
createShip(destroyer, 2, destroyerDiv)
createShip(cruiser, 3, cruiserDiv);
createShip(submarine, 3, submarineDiv);


const playerDivArray = [];
const computerDivArray = [];

/* Creates Board for player and computer */
function createBoard(article, arr) {
    for (let i = 0; i < 100; i++) {
        div = document.createElement('div');
        div.setAttribute('id', i);
        article.append(div)
        arr.push(div);
        div.classList.add('battleship-div')
    }
    gameboardSection.append(article)
    article.classList.add('battleship-grid')

}
createBoard(computerBoard, computerDivArray);
createBoard(playerBoard, playerDivArray);

console.log(playerDivArray)

/* Rotate image event */
/* Click event rotates ship icons 90 deg */
let vertical = true;
/* Rotate function checks if the icons are vertical if not
then it adds the rotateImgVertical class and changes vertical
to true. Else if vertical is true then the rotateImgVertical class
is removed */

const icons = [carrier, destroyer, cruiser, submarine];

function rotate() {
    if (vertical === false) {
        for (let x of icons) {
            x.classList.remove("rotateImgVertical");
        }
        vertical = true;
    } else if (vertical === true) {
        for (let x of icons) {
            x.classList.add("rotateImgVertical");
        }
        vertical = false;
    }
}

btnsDiv.append(rotateBtn)
rotateBtn.textContent = 'Rotate Ships'
rotateBtn.addEventListener('click', rotate)
/* Declare divarray is empty then pushes div to it for creation */

for (let x of playerDivArray) {
    x.addEventListener('drop', drop);
    x.addEventListener('dragover', dragOver)
}

for (let y of icons) {
    y.addEventListener('dragstart', dragStart);
    y.addEventListener('dragging', dragging);
    y.addEventListener('dragend', dragEnd);
    console.log(y)
}

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
    console.log(e.target.id);
    console.log(e)
}

function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    console.log(data)
    console.log(parseInt(e.target.id) + 1)
    e.target.classList.add(document.getElementById(data).classList);
    let cool = parseInt(e.target.id) + 10;
    console.log(cool)
    document.getElementById(cool).classList.add(document.getElementById(data).classList)
    console.log(playerDivArray)
}

function dragging(e) {

}

function dragEnd(e) {

}

function dragOver(e) {
    e.preventDefault();
}

