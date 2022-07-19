
/* Select all elements from html file */
/* body selector allows for appending and removing sections from html */
const body = document.querySelector('body');
/* turn is the textContent in the header that allows for the user to see
the status of the game */
const turn = document.querySelector("#turn");
/* generateBoard is a selector to a button that generates the playerBoard
allowing the user to place ships */
const generateBoard = document.querySelector("#generate-board");
/* rotateBtn is a button that rotates the ships verticaly or horizontally */
const rotateBtn = document.createElement('button');
rotateBtn.setAttribute('id', 'rotate-img')
/* gameboardSection is the primary section in which the game takes place
this section handles the transition between playerBoard and computerBoard */
const gameboardSection = document.querySelector("#gameboard");
/* playerBoardArticle is the playerBoard that contains all the player ships
and guesses by the computer */
const playerBoardArticle = document.createElement('article');
playerBoardArticle.setAttribute('id', 'playerBoard');
/* computerBoardArticle is the computerBoard that contains all the computer ships
and guesses by the player */
const computerBoardArticle = document.createElement('article');
computerBoardArticle.setAttribute('id', 'computerBoard');
/* destroyer is an image of the smallest ship that contains 2 boxes */
const destroyer = document.createElement('img');
destroyer.setAttribute('id', 'destroyer');
/* cruiser is an image of the second smallest ship that contains 3 boxes */
const cruiser = document.createElement('img');
cruiser.setAttribute('id', 'cruiser');
/* submarine is an image of the second largest ship that contains 4 boxes */
const submarine = document.createElement('img');
submarine.setAttribute('id', 'submarine');
/* carriser is an image of the largest shp that contains 5 boxes */
const carrier = document.createElement('img');
carrier.setAttribute('id', 'carrier');
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
shipStatus.setAttribute('id', 'ship-status')



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


let icons = [destroyer, cruiser, submarine, carrier]

rotateBtn.addEventListener('click', rotate)
/* Declare divarray is empty then pushes div to it for creation */

const divArray = [];
const computerDivArray = [];
const computerCarrierArr = [];
const computerSubmarineArr = [];
const computerCruiserArr = [];
const computerDestroyerArr = [];
const computerCarrierShipSize = 4;
const computerSubmarineShipSize = 3;
const computerCruiserShipSize = 2
const computerDestroyerShipSize = 1;
const playerCarrierArr = [];
const playerSubmarineArr = [];
const playerCruiserArr = [];
const playerDestroyerArr = [];
const carrierShipSize = 4;
const submarineShipSize = 3;
const cruiserShipSize = 2
const destroyerShipSize = 1;

function generateHeader() {
    header.append(btnsDiv);
    btnsDiv.appendChild(rotateBtn);
    header.append(imgDiv);
    imgDiv.append(destroyer);
    imgDiv.append(cruiser);
    imgDiv.append(submarine);
    imgDiv.append(carrier);
    btnsDiv.append(startGame);
    imgDiv.style.display = 'flex';
    rotateBtn.style.display = 'flex'
    startGame.textContent = 'Start Game';
    carrier.src = 'carriericon.png';
    submarine.src = 'submarineicon.png';
    cruiser.src = 'cruisericon.png';
    destroyer.src = 'destroyericon.png';
    rotateBtn.textContent = "Rotate Ship";
    rotateBtn.addEventListener("click", rotate);
    btnsDiv.style.display = 'flex'
    generateBoard.style.display = 'none';
    lockShips.style.display = 'none';
}


/* Refresh function resets the board, generates boxes with standard-box class
and resets the text */
function refresh(arr) {
    generateHeader()
    body.append(gameboardSection)
    gameboardSection.style.display = 'flex';
    console.log()
   
    if (arr === divArray) {
        gameboardSection.append(playerBoardArticle);
        playerBoardArticle.style.display = 'flex'
        for (let i = 0; i < 100; i++) {
            let div = document.createElement("div");
            div.setAttribute('id', i)
            arr.push(div);
            playerBoardArticle.append(div);
            div.classList.add("standard-box");
            div.classList.remove('ship-class');
        }
       
        placement(carrier, carrierShipSize, playerCarrierArr);
        placement(submarine, submarineShipSize, playerSubmarineArr);
        placement(destroyer, destroyerShipSize, playerDestroyerArr);
        placement(cruiser, cruiserShipSize, playerCruiserArr);
    } else if (arr === computerDivArray) {
        gameboardSection.removeChild(playerBoardArticle);
        gameboardSection.append(computerBoardArticle);
       
        for (let i = 0; i < 100; i++) {
            let div = document.createElement("div");
            div.setAttribute('id', i)
            arr.push(div);
            computerBoardArticle.append(div);
            computerBoardArticle.style.display = 'flex';
            div.classList.add("standard-box");
            div.classList.remove('ship-computer-class');
        }
       
        placement(carrier, computerCarrierShipSize, computerCarrierArr);
        placement(submarine, computerSubmarineShipSize, computerSubmarineArr);
        placement(destroyer, computerDestroyerShipSize, computerDestroyerArr);
        placement(cruiser, computerCruiserShipSize, computerCruiserArr);
    }
}

/* New Game button invokes refresh function */
generateBoard.addEventListener("click", function () {
    refresh(divArray)
})


/* Random placement function allows user and comnputer to randomly
place their ships */
const randomPlacement = num => {
    return Math.floor(Math.random() * num)
}

/* Placement function checks whether the shipPlace is true, if true
it will add a click event to the ship and add the img-hover class to 
highlight the selection then will invoke the placeShip function that
will inherit the shipSize */
function placement(ship, shipSize, shipArr) {
    console.log(ship)
    ship.classList.remove('rotateImgVertical')
    ship.addEventListener("click", function () {
        ship.classList.add("img-hover")
        console.log(ship)
        console.log(shipSize)

        placeShip(ship, shipSize, shipArr)
    })
    if (shipArr === computerCarrierArr || shipArr === computerCruiserArr || shipArr === computerDestroyerArr || shipArr === computerSubmarineArr) {
        placeShip(ship, shipSize, shipArr);
    }
}


/* placeShip function accepts the shipSize and will generate click
events on all game divs allowing the user to select their ship location
and then invoke the generateShipLocation which will accept ship size */


function placeShip(ship, shipSize, shipArr) {
    let origin
    let testVert;
    ship.style.display = 'none';
    if (shipArr === computerCarrierArr || shipArr === computerCruiserArr || shipArr === computerDestroyerArr || shipArr === computerSubmarineArr) {
        origin = computerDivArray[randomPlacement(computerDivArray.length)];
        origin.classList.add('ship-computer-class');
        origin.classList.remove('standard-box');
        ship.style.display = 'none';
        testVert = randomPlacement(10);
        console.log(testVert)
        if (testVert > 5) {
            vertical = true;
            generateShipLocation(ship, shipSize, shipArr, origin)
        } else {
            vertical = false;
            generateShipLocation(ship, shipSize, shipArr, origin)
        }
    }
    console.log(shipSize)
    divArray.forEach(x => {
        console.log(shipSize)
        x.addEventListener('click', function () {
            this.classList.add("ship-class")
            this.classList.remove("standard-box")
            console.log(shipSize)
            origin = x;
            ship.style.display = 'none';
            ship.classList.remove('img-hover')
            generateShipLocation(ship, shipSize, shipArr, origin)
            shipArr = undefined;
            x = undefined;
            header.append(btnsDiv)
            btnsDiv.style.display = 'flex'
            btnsDiv.append(rotateBtn)
            rotateBtn.style.display = 'flex'
            return
        })
    })
}

/* Generates a players and computers ship location based on the origin
number and the shipsize, will add the ship class and the ship computer 
class */
function generateShipLocation(ship, shipSize, shipArr, origin) {
    let nextLocation;
    console.log(vertical)
    console.log(shipSize)
    console.log(ship)
    if (shipArr.length === 0) {
        shipArr.push(origin)
        console.log(shipArr)
        console.log(origin.id)
    }
    console.log(origin)
    while (shipSize !== 0 && vertical) {
        console.log(nextLocation)
        if (shipArr === playerCarrierArr || shipArr === playerCruiserArr || shipArr === playerDestroyerArr || shipArr === playerSubmarineArr) {
            if (ship === carrier && parseInt(origin.id) > 60 || ship === submarine && parseInt(origin.id) > 70 || ship === cruiser && parseInt(origin.id) > 80 || ship === destroyer && parseInt(origin.id) > 90) {
                nextLocation = document.getElementById(parseInt(origin.id) - (shipSize * 10))
            } else {
                nextLocation = document.getElementById(parseInt(origin.id) + (shipSize * 10))
            }
            nextLocation.classList.add('ship-class')
            nextLocation.classList.remove('standard-box')

            shipArr.push(nextLocation);
            shipSize -= 1;
            console.log(nextLocation.id)
        } else if (shipArr === computerCarrierArr || shipArr === computerCruiserArr || shipArr === computerDestroyerArr || shipArr === computerSubmarineArr) {
            if (ship === carrier && parseInt(origin.id) > 60 || ship === submarine && parseInt(origin.id) > 70 || ship === cruiser && parseInt(origin.id) > 80 || ship === destroyer && parseInt(origin.id) > 90) {
                nextLocation = document.getElementById(parseInt(origin.id) - (shipSize * 10))
            } else {
                nextLocation = document.getElementById(parseInt(origin.id) + (shipSize * 10))
            }
            nextLocation.classList.add('ship-computer-class')
            nextLocation.classList.remove('standard-box')

            shipArr.push(nextLocation);
            shipSize -= 1;
            console.log(nextLocation.id)
        }



    }
    while (shipSize !== 0 && vertical === false) {

        if (shipArr === computerCarrierArr || shipArr === computerCruiserArr || shipArr === computerDestroyerArr || computerSubmarineArr === shipArr) {
            if (origin.id.endsWith('9') || origin.id.endsWith('8') || origin.id.endsWith('7') || origin.id.endsWith('6')) {
                nextLocation = document.getElementById(parseInt(origin.id) - (shipSize))
            } else {
                nextLocation = document.getElementById(parseInt(origin.id) + (shipSize))
            }
            nextLocation.classList.add('ship-computer-class')
            nextLocation.classList.remove('standard-box')
            shipArr.push(nextLocation)
            shipSize -= 1;
        }
        if (shipArr === playerCarrierArr || shipArr === playerCruiserArr || shipArr === playerDestroyerArr || shipArr === playerSubmarineArr) {
            if (origin.id.endsWith('9') || origin.id.endsWith('8') || origin.id.endsWith('7') || origin.id.endsWith('6')) {
                nextLocation = document.getElementById(parseInt(origin.id) - (shipSize))
            } else {
                nextLocation = document.getElementById(parseInt(origin.id) + (shipSize))
            }
            nextLocation.classList.add('ship-class')
            nextLocation.classList.remove('standard-box')
            console.log('hello')
            shipArr.push(nextLocation)
            shipSize -= 1;
        }

    }

    console.log(shipArr)
    console.log(playerCarrierArr)
    console.log(playerSubmarineArr)
    console.log(playerCruiserArr)
    console.log(playerDestroyerArr)
    console.log('done')
    console.log(computerCarrierArr);
    console.log(computerCruiserArr);
    console.log(computerDestroyerArr);
    console.log(computerSubmarineArr);
    ship.style.display = 'none';
    shipArr = null;
    appendLockShipBtn();
    if (computerCarrierArr.length > 0 && computerCruiserArr.length > 0 && computerDestroyerArr.length > 0 && computerSubmarineArr.length > 0) {
        lockShipPlacement()
    }
    return
}

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
    } else if (arr1.className === 'ship-computer-class') {
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
    } else if (arr1.className === 'ship-computer-class') {
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
    } else if (arr1.className === 'ship-computer-class') {
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
    } else if (arr1.className === 'ship-computer-class') {
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

/* lockShipPlace loops through all the player ship arrays and locks
their placement if none of them collide, if they do all of the ships
are removed from the board and generate again */
function lockShipPlacement() {

    if (playerSubmarineArr.some(checkSubmarineArr) === true || playerCarrierArr.some(checkCarrierArr) === true || playerCruiserArr.some(checkCruiserArr) === true || playerDestroyerArr.some(checkDestroyerArr) === true) {
        carrier.style.display = 'flex';
        submarine.style.display = 'flex';
        cruiser.style.display = 'flex';
        destroyer.style.display = 'flex';
        turn.textContent = 'Place Ships Again';

        for (let x of playerCarrierArr) {
            x.classList.remove('ship-class')
        }
        for (let y of playerCruiserArr) {
            y.classList.remove('ship-class')
        }
        for (let i of playerDestroyerArr) {
            i.classList.remove('ship-class')
        }
        for (let z of playerSubmarineArr) {
            z.classList.remove('ship-class')
           
        }
        setTimeout(() => {
            restartPlacement(divArray)

        }, 300);
        shipLocked = false;
        return
    } else if (computerSubmarineArr.some(checkSubmarineArr) === true || computerCarrierArr.some(checkCarrierArr) === true || computerCruiserArr.some(checkCruiserArr) === true || computerDestroyerArr.some(checkDestroyerArr) === true) {
        for (let x of playerCarrierArr) {
            x.classList.remove('ship-comoputer-class')
        }
        for (let y of playerCruiserArr) {
            y.classList.remove('ship-computer-class')
        }
        for (let i of playerDestroyerArr) {
            i.classList.remove('ship-computer-class')
        }
        for (let z of playerSubmarineArr) {
            z.classList.remove('ship-computer-class')
        }
        setTimeout(() => {
            restartPlacement(computerDivArray)

        }, 300);

        return
    } else {
        transitionGame()
    }
}


function restartPlacement(arr) {
    if (arr === divArray) {
        arr = [];
        refresh(arr)
    } else if (arr === computerDivArray) {
        arr = [];
        refresh(arr)
    }
}

const appendLockShipBtn = () => {
    if (carrier.style.display === 'none' && cruiser.style.display === 'none' && submarine.style.display === 'none' && destroyer.style.display === 'none') {
        btnsDiv.append(lockShips);
        lockShips.style.display = 'flex'
        rotateBtn.textContent = 'Rotate Ship'
        lockShips.textContent = 'Lock Ships';
        rotateBtn.style.display = 'none';
    } else {
        lockShips.style.display = 'none';
        startGame.style.display = 'none';
        rotateBtn.style.display = 'none';
    }
}

function transitionGame() {
    turn.textContent = "Computer Placing Ships";
    turn.appendChild(shipStatus);
    shipStatus.textContent = 'Waiting';
    shipStatus.style.display = 'flex';

    setTimeout(() => {
        body.append(gameboardSection)
        gameboardSection.removeChild(playerBoardArticle)
        gameboardSection.appendChild(computerBoardArticle);
        computerBoardArticle.style.display = 'flex';

    }, 700);
    for (let i = 0; i < 100; i++) {
        let cpuDiv = document.createElement('div');
        cpuDiv.setAttribute('id', i)
        computerBoardArticle.append(cpuDiv);
        computerDivArray.push(cpuDiv)
        cpuDiv.classList.add('standard-box');
    } lockShips.style.display = 'none';
    startGame.style.display = 'flex';
    setTimeout(() => {
        console.log(computerDivArray)
        placement(carrier, computerCarrierShipSize, computerCarrierArr);
        console.log(computerCarrierArr)
        placement(destroyer, computerDestroyerShipSize, computerDestroyerArr);
        placement(cruiser, computerCruiserShipSize, computerCruiserArr);
        placement(submarine, computerSubmarineShipSize, computerSubmarineArr);
        lockShips.style.display = 'none';
        turn.textContent = 'Start Game';
    }, 1000);
}


lockShips.addEventListener('click', lockShipPlacement)


function playerTurn() {
    console.log(computerBoardArticle)
    for (let i of computerDivArray) {
        i.addEventListener('click', function () {
            if (computerCarrierArr.includes(this) || computerCruiserArr.includes(this) || computerDestroyerArr.includes(this) || computerSubmarineArr.includes(this)) {
                this.classList.remove('ship-computer-class')
                this.classList.add('hit-class')
                i = undefined;
                shipStatus.textContent = 'Hit';
                computerBoardArticle.style.display = 'flex';
                gameboardSection.removeChild(computerBoardArticle);
                gameboardSection.appendChild(playerBoardArticle)

                for (let x of computerCarrierArr) {
                    for (let y of computerCruiserArr) {
                        for (let i of computerDestroyerArr) {
                            for (let z of computerSubmarineArr) {
                                if (x.className === 'hit-class') {
                                    shipStatus.textContent = 'Carrier Sunk';
                                } else if (y.className === 'hit-class') {
                                    shipStatus.textContent = 'Cruiser Sunk';
                                } else if (i.className === 'hit-class') {
                                    shipStatus.textContent = 'Destroyer Sunk';
                                } else if (z.className = 'hit-class') {
                                    shipStatus.textContent = 'Submarine Sunk';
                                }
                            }
                        }
                    }
                } if (this.className === 'hit-class') {
                    gameboardSection.removeChild(computerBoardArticle);
                    gameboardSection.appendChild(playerBoardArticle);
                    turn.textContent = 'Computer Turn';
                    i = undefined;
                    setTimeout(() => {

                        computerTurn()
                    }, 2000);
                }
            } else {
                setTimeout(() => {
                    i.classList.remove('ship-class');
                    i.classList.add('miss-class');
                    shipStatus.textContent = 'Miss';
                }, 500)

                setTimeout(() => {
                    gameboardSection.removeChild(computerBoardArticle);
                    gameboardSection.appendChild(playerBoardArticle);
                    turn.textContent = 'Computer Turn';
                    i = undefined;
                }, 600);

                setTimeout(() => {

                    computerTurn()
                }, 3500);

            }
        })
    }

}

/* Computer Turn declares computer guess, then creates a random computer guess on the board,
if computer guess is in any of the player ship arrays then alter the board and call 
playerTurn()*/
function computerTurn() {
    let computerGuess;
    computerGuess = randomPlacement(computerDivArray.length);
    for (let i of divArray) {
        if (parseInt(i.id) === computerGuess) {
            if (playerCarrierArr.includes(i) || playerCruiserArr.includes(i) || playerDestroyerArr.includes(i) || playerSubmarineArr.includes(i)) {
                i.classList.remove('ship-class')
                i.classList.add('hit-class')
                setTimeout(() => {
                    gameboardSection.removeChild(playerBoardArticle);
                    gameboardSection.appendChild(computerBoardArticle);
                    turn.textContent = 'Player Turn';
                }, 600);

                setTimeout(() => {

                    playerTurn()
                }, 2000);
                i = undefined;
            } else {
                i.classList.remove('ship-class');
                i.classList.add('miss-class');
                setTimeout(() => {
                    gameboardSection.removeChild(playerBoardArticle);
                    gameboardSection.appendChild(computerBoardArticle);
                    turn.textContent = 'Player Turn';
                }, 600);

                i = undefined;
                setTimeout(() => {

                    playerTurn()
                }, 2000);

            }
        }
    }

}

const game = () => {
    startGame.style.display = 'none';
    btnsDiv.append(restartBtn);
    restartBtn.style.display = 'flex';
    restartBtn.textContent = 'Restart'
    turn.textContent = 'Player Turn';
    playerTurn();
}

const restart = () => {
    restartBtn.style.display = 'none';
    generateBoard.style.display = 'flex';
}

startGame.addEventListener('click', game)

restartBtn.addEventListener('click', restart) 