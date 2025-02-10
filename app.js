            //specify some variables
            const selectBox = document.querySelector(".select-box"),
            selectBtnX = selectBox.querySelector(".options .playerX"),
            selectBtnO = selectBox.querySelector(".options .playerO"),
            playBoard = document.querySelector(".play-board"),
            players= document.querySelector(".players"),
            allBox = document.querySelectorAll("section span"),

            resultBox = document.querySelector(".result-box"),
            wonText = resultBox.querySelector(".won-text"),
            replayBtn = resultBox.querySelector("btn");

            window.onload = () => {
                //clickable box

            for (let i=0; i< allBox.length; i++){
            allBox[i].setAttribute("onclick","clickBox(this)");
            } 
            }
            selectBtnX.onclick = () => {
                selectBox.classList.add("hide");
                playBoard.classList.add("show");
            }
            selectBtnO.onclick = () => {
                selectBox.classList.add("hide");
                playBoard.classList.add("show");
                players.setAttribute("class", "players active player");

            }

            let playerXIcon = "fas fa-times", playerOIcon = "far fa-circle", playerSign = "X", runBot = true;

            // user click function
            function clickBox(element){
                if(players.classList.contains("player")){
                    playerSign = "O";
                    element.innerHTML = `<i class="${playerOIcon}"></i>`;
                    players.classList.remove("active");
                    element.setAttribute("id", playerSign);
                } else {
                    element.innerHTML = `<i class="${playerXIcon}"></i>`;
                    players.classList.add("active");
                    element.setAttribute("id", playerSign);
                }
                selectWinner();
                element.style.pointerEvents = "none";
                playBoard.style.pointerEvents = "none";
                
                //computer delay time
                let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
                setTimeout(() => {
                    bot(runBot);
                }, randomTimeDelay);

            }                       

            //bot function
            function bot(){
                let array =[];
                if(runBot){
                    playerSign= "O";

                    //unmarked boxes
                    for(let i=0; i<allBox.length; i++){
                        if(allBox[i].childElementCount == 0){
                            array.push(i);
                        }
                    }
            //random box selection
            let randomBox = array[Math.floor(Math.random() * array.length)];
            if(array.length > 0){
                if(players.classList.contains("player")){
                    playerSign = "X";
                    allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                    players.classList.add("active");
                    allBox[randomBox].setAttribute("id", playerSign);
                } else {
                    allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                    players.classList.remove("active");
                    allBox[randomBox].setAttribute("id", playerSign);
                }
                selectWinner();
            }
            allBox[randomBox].style.pointerEvents = "none";
            playBoard.style.pointerEvents = "auto";
            playerSign = "X";

                }
            }

            // sign box
            function getIDVal(classname){
                return document.querySelector(".box" + classname).id;
            }

            //box check
            function checkIDSign(val1, val2, val3, sign){
                if(getIDVal(val1) == sign && getIDVal(val2) == sign && getIDVal(val3) == sign){
                    return true;
                }else{
                    return false;
                }
            }

            //winner selection
            function selectWinner(){
                if(checkIDSign(1,2,3, playerSign) || checkIDSign(4,5,6, playerSign) || checkIDSign(7,8,9, playerSign) || checkIDSign(1,4,7, playerSign) || checkIDSign(2,5,8, playerSign) || checkIDSign(3,6,9, playerSign) || checkIDSign(1,5,9, playerSign) || checkIDSign(3,5,7, playerSign)){
                    runBot = false;
                bot(runBot);

                //buffer time for winner
                setTimeout(() => {
                    playBoard.classList.remove("show");
                    resultBox.classList.add("show");
                },600)
                wonText.innerHTML = `Playa <p>${playerSign}</p> won the game!`;
                }
                else{
        //if all boxes are marked
        if(getIDVal(1) != "" && getIDVal(2) != "" && getIDVal(3) != "" && getIDVal(4) != "" && getIDVal(5) != "" && getIDVal(6) != "" && getIDVal(7) != "" && getIDVal(8) != "" && getIDVal(9) != ""){
            runBot = false;
            bot(runBot);

            //buffer time for winner
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },600)
            wonText.textContent = "Y'all tied!";
        }
    }

            }

            //replay function
            replayBtn.onclick = () => {
                window.location.reload();
            }