
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
/* Carrier, destroyer, cruiser, submarine are the 4 different ships,
below the ships are created and their id is set and applied a class
that sets their color */
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
/* These divs surround the ships above the board so there is space when
the ships are rotated */
const carrierDiv = document.createElement('div');
const destroyerDiv = document.createElement('div');
const submarineDiv = document.createElement('div');
const cruiserDiv = document.createElement('div');
const standardBox = document.querySelectorAll('.standard-box');
carrierDiv.classList.add('ships-selector');
destroyerDiv.classList.add('ships-selector');
cruiserDiv.classList.add('ships-selector');
submarineDiv.classList.add('ships-selector');
/* the imgDiv appends these divs containing the ships */
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

/* Random math function that allows for random placement of computer
ships */
const randomPlacement = num => {
    return Math.floor(Math.random() * num);
}

/* These arrays carry every div on the board */
const playerDivArray = [];
const computerDivArray = [];

/* Creates Board for player and computer */
function createBoard(article, arr) {
    for (let i = 0; i < 100; i++) {
        div = document.createElement('div');
        if (article === computerBoard) {
            div.setAttribute('id', 'computer-box' + i);
        } else {
            div.setAttribute('id', i)
        }
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
    console.log(e.target.id)
    e.target.classList.add(document.getElementById(data).classList);
    console.log(e)
    document.getElementById(parseInt(e.target.id) + 10).classList.add(document.getElementById(data).classList)
    console.log(playerDivArray)
}

function dragging(e) {

}

function dragEnd(e) {

}

function dragOver(e) {
    e.preventDefault();
}

let computerCarrier;
let computerCruiser;
let computerDestroyer;
let computerSubmarine;
const computerCarrierSize = 3;
const computerCruiserSize = 2;
const computerSubmarineSize = 2;
const computerDestroyerSize = 1;
let computerCarrierDirection;
let computerDestroyerDirection;
let computerSubmarineDirection;
let computerCruiserDirection;
let computerCruiserArr = [];
let computerCarrierArr = [];
let computerDestroyerArr = [];
let computerSubmarineArr = [];

function computerShipDirection() {
    let shipDirection = randomPlacement(5);
    let horizontal;
    if (shipDirection >= 3) {
        return horizontal = false;
    } else {
        return horizontal = true;
    }
}
function computerShipLocation(ship, shipSize, shipRotate, shipArr) {
    let nextLocation;
    let shipString;
    ship = randomPlacement(computerDivArray.length)
    shipArr.push(computerDivArray[ship])
    shipString = ship.toString()
    console.log(shipString)
    computerDivArray[ship]
    computerDivArray[ship].classList.add('ship-computer-class')
    shipRotate = computerShipDirection();
    console.log(shipRotate)
    while (shipSize !== 0 && shipRotate === false && shipString.endsWith('6') !== true && shipString.endsWith('7') !== true && shipString.endsWith('8') !== true && shipString.endsWith('9') !== true) {
        nextLocation = computerDivArray[ship + shipSize]
        nextLocation.classList.add('ship-computer-class')
        shipArr.push(nextLocation)
        shipSize -= 1;
        console.log(shipSize)
    } while (shipSize !== 0 && shipRotate === false && shipString.endsWith('6') || shipString.endsWith('7') || shipString.endsWith('8') || shipString.endsWith('9')) {
        nextLocation = computerDivArray[ship - shipSize]
        nextLocation.classList.add('ship-computer-class')
        console.log(nextLocation)
        shipArr.push(nextLocation);
        shipSize -= 1;
        console.log(shipSize)
        if (shipSize === 0) {
            break
        }
    } while (shipSize !== 0 && shipRotate === true && ship <= 39) {
        nextLocation = computerDivArray[ship + (shipSize * 10)];
        console.log(nextLocation)
        nextLocation.classList.add('ship-computer-class');
        shipArr.push(nextLocation);
        shipSize -= 1;
        console.log(shipSize)
    } while (shipSize !== 0 && shipRotate === true && ship > 39) {
        nextLocation = computerDivArray[ship - (shipSize * 10)];
        console.log(nextLocation)
        nextLocation.classList.add('ship-computer-class');
        shipArr.push(nextLocation);
        shipSize -= 1;
        console.log(shipSize);
    }
}
computerShipLocation(computerCruiser, computerCruiserSize, computerCruiserDirection, computerCruiserArr);
computerShipLocation(computerCarrier, computerCarrierSize, computerCarrierDirection, computerCarrierArr);
computerShipLocation(computerDestroyer, computerDestroyerSize, computerDestroyerDirection, computerDestroyerArr);
computerShipLocation(computerSubmarine, computerSubmarineSize, computerSubmarineDirection, computerSubmarineArr);

console.log(computerCruiserArr);
console.log(computerCarrierArr);
console.log(computerSubmarineArr);
console.log(computerDestroyerArr);


function checkSubmarineArr(arr1) {
    if (arr1.className === 'ship-class') {
        for (let x of playerCruiserArr) {
            for (let y of playerDestroyerArr) {
                for (let i of playerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    } else if (arr1.classList[1] === 'ship-computer-class') {
        for (let x of computerCruiserArr) {
            for (let y of computerDestroyerArr) {
                for (let i of computerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    }
}
function checkCarrierArr(arr1) {
    if (arr1.className === 'ship-class') {
        for (let x of playerCruiserArr) {
            for (let y of playerDestroyerArr) {
                for (let i of playerSubmarineArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    } else if (arr1.classList[1] === 'ship-computer-class') {
        for (let x of computerCruiserArr) {
            for (let y of computerDestroyerArr) {
                for (let i of computerSubmarineArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    }
}
function checkCruiserArr(arr1) {
    if (arr1.className === 'ship-class') {
        for (let x of playerSubmarineArr) {
            for (let y of playerDestroyerArr) {
                for (let i of playerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    } else if (arr1.classList[1] === 'ship-computer-class') {
        for (let x of computerSubmarineArr) {
            for (let y of computerDestroyerArr) {
                for (let i of computerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    }
}
function checkDestroyerArr(arr1) {
    if (arr1.className === 'ship-class') {
        for (let x of playerCruiserArr) {
            for (let y of playerSubmarineArr) {
                for (let i of playerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    } else if (arr1.classList[1] === 'ship-computer-class') {
        for (let x of computerCruiserArr) {
            for (let y of computerSubmarineArr) {
                for (let i of computerCarrierArr) {
                    if (x === arr1 || y === arr1 || i === arr1) {
                        return true
                    }
                }
            }
        }
    }
}

function checkComputerLocation() {

    if (computerDestroyerArr.some(checkDestroyerArr) === true || computerCarrierArr.some(checkCarrierArr) === true || computerSubmarineArr.some(checkSubmarineArr) === true || computerCruiserArr.some(checkCruiserArr) === true) {
        console.log('hi')
        computerCarrierArr = [];
        computerCruiserArr = [];
        computerSubmarineArr = [];
        computerDestroyerArr = [];
        for (let x of computerDivArray) {
            x.classList.remove('ship-computer-class')
        }
        console.log(computerDestroyerArr)
        computerShipLocation(computerCruiser, computerCruiserSize, computerCruiserDirection, computerCruiserArr);
        computerShipLocation(computerCarrier, computerCarrierSize, computerCarrierDirection, computerCarrierArr);
        computerShipLocation(computerDestroyer, computerDestroyerSize, computerDestroyerDirection, computerDestroyerArr);
        computerShipLocation(computerSubmarine, computerSubmarineSize, computerSubmarineDirection, computerSubmarineArr);

    } else {
        console.log('done')
    }

}

checkComputerLocation()