
// Bugs : clicking same color at a time multiple times :( 
    //soltuion : use pointer events on that clicked button;

let  container = document.querySelector(".container");
let colors = ["blue","green","red","yellow","orange","pink","violet","black","blue","green","red","yellow","orange","pink","violet","black"];
let randomColor;
let wholeCont = document.getElementById("cont");
let chances = 5;
let displayChance = document.getElementById("chancesLeft");
let heading3 = document.getElementById("heading");
let stopStart = document.getElementById("start");
let isStarted = false;
function start(){
    if(isStarted===false){
        stopStart.style.display = "none";
        isStarted = true;
        wholeCont.style.pointerEvents = "all";
    }
    else{
        isStarted = false;
        wholeCont.style.pointerEvents = "none";
    }
    
    getRandomColor();
}
for(let i=0;i<16;i++){
    let div = document.createElement("div");
    div.id = "box" + (i+1);
    div.className = "colorBox";
    container.appendChild(div);
}
function getRandomColor() {
    let size = colors.length;
    for(let i=1;i<=16;i++){
        let randColor = Math.floor(Math.random() *size);
        // console.log(randColor);
        let myColor = colors[randColor];
        colors.splice(randColor,1);
        size--;
        // console.log(myColor);
        document.getElementById('box'+i).style.backgroundColor = myColor; 
    }
    changeGray();
}
function changeGray(){
    for(let i=1;i<=16;i++){
        document.getElementById('box'+i).classList.add("addGray");
    }
}

let count = 0;
let prev , prevBox;
let curr , currBox;


// alert('fdikf');
for (let i = 1; i <= 16; i++) {
    if(isStarted===false){
        document.getElementById('box' + i).addEventListener('click', function (event) {
            const clickedEvent = event.target;
            count++;
            let clickedBox = document.getElementById('box'+i);
            clickedBox.classList.remove("addGray");
            if(count==1){
                prevBox = clickedBox;
                prev = clickedBox.style.backgroundColor;
                
                // console.log(prev);
            }
            if(count==2){
                currBox = clickedBox;
                curr = clickedBox.style.backgroundColor;
                wholeCont.style.pointerEvents = "none";
                let isWin = check(prev,curr);
                console.log(isWin);
                if(isWin===false){
                    setTimeout(()=>{
                        prevBox.classList.add("addGray");
                        currBox.classList.add("addGray");
                        wholeCont.style.pointerEvents = "all";
                    },1000);
                    chances--;
                    displayChance.innerHTML = `${chances}`;
                    
                }
                else{
                    setTimeout(() => {
                        wholeCont.style.pointerEvents = "all";
                    },1000);
                }
                
                count = 0;
                
                
            }
            if(chances===0){
                // alert("u lose");
                heading3.innerHTML = `You Lose`;
                setTimeout(() => {
                    for(let i=1;i<=16;i++){
                        document.getElementById('box'+i).classList.remove("addGray");
                    }
                    // restart();
                }, 1000);
                reset();
            }
            
            
        });
    }

}


function check(prev,curr){
    if(prev===curr){
        return true;
    }
    else{
        return false;
    }
}

function reset(){
    chances = 5;
    // changeGray();
    setTimeout(()=>{
        wholeCont.style.pointerEvents = "none";
    },1000);
}

function restart(){
    isStarted = false;
    window.location.reload();
    stopStart.style.display = "none";
    start();
    // stopStart.style.pointerEvents = "all";
}