
/* Select all elements from html file */
const turn = document.querySelector("#turn");
const newGame = document.querySelector("#new-game");
const rotateImg = document.querySelector("#rotate-img");
const icons = document.querySelectorAll("img");
const gameboardSection = document.querySelector("#gameboard");
const destroyer = document.querySelector("#destroyer");
const cruiser = document.querySelector("#cruiser");
const submarine = document.querySelector("#submarine");
const carrier = document.querySelector("#carrier");


let carrierPlace = true;
let submarinePlace = true;
let cruiserPlace = true;
let destroyerPlace = true;
const carrierShip = 4;
const submarineShip = 3;
const cruiserShip = 2;
const destroyerShip = 1;
/* Rotate image event */
/* Click event rotates ship icons 90 deg */
let vertical = false;
/* Rotate function checks if the icons are vertical if not
then it adds the rotateImgVertical class and changes vertical
to true. Else if vertical is true then the rotateImgVertical class
is removed */
function rotate() {
    if (vertical === false) {
        for (let x of icons) {
            x.classList.add("rotateImgVertical");
        }
        vertical = true;
    } else if (vertical === true) {
        for (let x of icons) {
            x.classList.remove("rotateImgVertical");
        }
        vertical = false;
    }
}

rotateImg.addEventListener("click", rotate)

/* Declare divarray is empty then pushes div to it for creation */

let divArray = [];

/* Refresh function resets the board, generates boxes with standard-box class
and resets the text */
function refresh() {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        div.setAttribute('id', i)
        divArray.push(div);
        gameboardSection.append(div);
        div.classList.add("standard-box");
    }
    placement(carrierPlace, carrier, carrierShip);
    placement(submarinePlace, submarine, submarineShip);
    placement(destroyerPlace, destroyer, destroyerShip);
    placement(cruiserPlace, cruiser, cruiserShip)
}

/* New Game button invokes refresh function */
newGame.addEventListener("click", refresh)

/* Random placement function allows user and comnputer to randomly
place their ships */
const randomPlacement = num => {
    return Math.floor(Math.random() * num)
}

/* Placement function checks whether the shipPlace is true, if true
it will add a click event to the ship and add the img-hover class to 
highlight the selection then will invoke the placeShip function that
will inherit the shipSize */
function placement(shipPlace, ship, shipSize) {
    if (shipPlace === true) {
        ship.addEventListener("click", function () {
            ship.classList.add("img-hover")
            shipPlace = false;
            console.log(ship)
            console.log(shipSize)
            placeShip(shipSize, ship)
        })
        return
    }
    else if(shipPlace === false){
        console.log("is false")
        return
    }
}


/* placeShip function accepts the shipSize and will generate click
events on all game divs allowing the user to select their ship location
and then invoke the generateShipLocation which will accept ship size */


function placeShip(shipSize, ship) {
    console.log(shipSize)
    divArray.forEach(x => {
        console.log(shipSize)
        x.addEventListener('click', function () {
            this.classList.add("ship-class")
            this.classList.remove("standard-box")
            console.log(shipSize)
            let transition = x;
            ship.classList.remove('img-hover')
            generateShipLocation(transition, shipSize)
            shipSize = undefined;
        })
    })
}

function generateShipLocation(original, ship) {
    let nextLocation;
    console.log(ship)
    console.log(original)
    while (ship !== 0 && vertical) {
        nextLocation = document.getElementById(parseInt(original.id) + (ship * 10))
        console.log(nextLocation)
        if (nextLocation === null) {
            nextLocation = document.getElementById(parseInt(original.id) - (ship * 10))
        }
        nextLocation.classList.add('ship-class')
        nextLocation.classList.remove('standard-box')
        ship -= 1;
        console.log(nextLocation.id)
    }
    while (ship !== 0 && vertical === false) {
        nextLocation = document.getElementById(parseInt(original.id) + (ship))
        if (original.id.endsWith('9') || original.id.endsWith('8') || original.id.endsWith('7') || original.id.endsWith('6')) {
            nextLocation = document.getElementById(parseInt(original.id) - (ship))
        }
        console.log(ship)
        console.log(original)
        console.log(nextLocation)
        nextLocation.classList.add('ship-class')
        nextLocation.classList.remove('standard-box')
        ship -= 1;
    }
    console.log('done')
    nextLocation = null;
    original = null;
    ship = null;
    return
}
