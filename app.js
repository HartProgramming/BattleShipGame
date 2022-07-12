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


let carrierPlace;
let submarinePlace = true;
let cruiserPlace = true;
let destroyerPlace = true;
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

function refresh() {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        divArray.push(div);
        console.log(divArray);
        gameboardSection.append(div);
        div.classList.add("standard-box");
    }
}

newGame.addEventListener("click", refresh)

function carrierPlacement() {
    carrierPlace = true;
    if (carrierPlace === true) {
        carrier.addEventListener("click", function () {
            carrier.classList.add("img-hover")
            console.log("hi")
            carrierPlace = false;
            placement()
        })
    }
}

function placement() {
    console.log("hi")
    if (carrierPlace === false) {
        console.log("hi")
        for (let x of divArray) {
            x.addEventListener("click", function () {
                x.append(carrier)
                console.log("hi")
                console.log(divArray)
                carrier.classList.add("carrier-class")
                carrier.classList.remove("img-hover")
            })
        }
    }
}

carrierPlacement()
