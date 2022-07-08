/* Select all elements from html file */
const turn = document.querySelector("#turn");
const newGame = document.querySelector("#new-game");
const rotateImg = document.querySelector("#rotate-img");
const icons = document.querySelectorAll("img");
/* Click event rotates ship icons 90 deg */
let vertical = false;

function rotate(){
    if(vertical === false){
        for(let x of icons){
            x.classList.add("rotateImgVertical");
        }
        vertical = true;
    }else if(vertical === true){
        for(let x of icons){
            x.classList.remove("rotateImgVertical");
        }
        vertical = false;
    }
}

rotateImg.addEventListener("click", rotate)
   

