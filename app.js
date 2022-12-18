let DOM_cell = [];
const DIM = 3;
let gridEval = [];
const human = 1;
const AI = 2;
let grid = [];
let moveCounter = 0;

function setup(){
    grid =  [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];
    for(let i=0;i<DIM*DIM;i++){
        gridEval[i] = 0;
    }
}

function main(){
    setup();
    DOM_cell = document.querySelectorAll('.cell');

    for(let j=0;j<DIM;j++){
        for(let i=0 ;i<DIM;i++){
            let index = i+j*3;
            DOM_cell[index].id = `${i+j*DIM}`;
            DOM_cell[index].addEventListener('click',()=>{
                if(grid[j][i] != 0){
                    alert("Invalid Move");
                    return;
                }
                DOM_cell[index].innerText = "X";
                DOM_cell[index].style.textShadow = "-4px 5px 30px white";
                //Collapse cell and count moves
                grid[j][i] = human;
                gridEval[i+j*DIM] = human;
                moveCounter++;
                
                //Evaluate the move
                moveCounter = makeNextMove(moveCounter,gridEval,grid);
            })
        }
    }
    //Draw modal
    function lostModalCall(){
        let DOM_lost_modal = document.getElementById("lost_modal");
        DOM_lost_modal.style.display = "block";
        window.addEventListener("click",function(event){
            if (event.target == DOM_lost_modal) {
                DOM_lost_modal.style.display = "none";
                reloadThePage();
            }
        })
    }

    //Lost modal
    function drawModalCall(){
        let DOM_draw_modal = document.getElementById("draw_modal"); 
            DOM_draw_modal.style.display = "block";
            window.addEventListener("click",function(event){
                if (event.target == DOM_draw_modal) {
                    DOM_draw_modal.style.display = "none";
                    reloadThePage();
                }
            })
    }

    // Reloads the page 
    function reloadThePage(){
        window.location.reload(true);
    }

    //evaluating the move
    function evaluateNextMove(grid){
        let requiredObj = findBestMove(grid);
        return requiredObj;
    }

    //making the moves
    function makeNextMove(moveCounter,gridEval,grid){
        //Winning condition
        eval_WinningCondition(gridEval);

        //Draw Condition
        //let DOM_draw_modal = document.getElementById("draw_modal"); 
        if(moveCounter >= 9){
            // DOM_draw_modal.style.display = "block";
            // window.addEventListener("click",function(event){
            //     if (event.target == DOM_draw_modal) {
            //         DOM_draw_modal.style.display = "none";
            //         reloadThePage();
            //     }
            // })
            drawModalCall();
        }
        if( moveCounter < 9 && moveCounter%2 != 0){
            
            let changedIndex = evaluateNextMove(grid);
            gridEval[changedIndex] = 2;

            let currCell = document.getElementById(`${changedIndex}`);
            currCell.innerText = "O";
            currCell.style.textShadow = "-4px 5px 30px white";

            moveCounter++;
            eval_WinningCondition(gridEval);
            return moveCounter;
        }
    }
    //Winning condition
    function eval_WinningCondition(gridEval){
        for(let i=0;i<DIM*DIM;i++){
            if(i==0){
                if( gridEval[i]==1 && gridEval[i+4]==1 && gridEval[i+8]==1 ){
                    alert("YOU WIN !");reloadThePage();
                }else if( gridEval[i]==2 && gridEval[i+4]==2 && gridEval[i+8]==2 ){
                    lostModalCall();
                }
            }
            if(i==2){
                if( gridEval[i]==1 && gridEval[i+2]==1 && gridEval[i+4]==1 ){
                    alert("YOU WIN !");reloadThePage();
                }else if( gridEval[i]==2 && gridEval[i+2]==2 && gridEval[i+4]==2 ){
                    lostModalCall();
                }
            }
            if(i==0 || i==1 || i==2){
                if( gridEval[i]==1 && gridEval[i+3]==1 && gridEval[i+6]==1 ){
                    alert("YOU WIN !");reloadThePage();
                }else if( gridEval[i]==2 && gridEval[i+3]==2 && gridEval[i+6]==2 ){
                    lostModalCall();
                }
            }
            if(i==0 || i==3 || i==6){
                if( gridEval[i]==1 && gridEval[i+1]==1 && gridEval[i+2]==1 ){
                    alert("YOU WIN !");reloadThePage();
                }else if( gridEval[i]==2 && gridEval[i+1]==2 && gridEval[i+2]==2 ){
                    lostModalCall();
                }
            }
        }
    }
}
main();