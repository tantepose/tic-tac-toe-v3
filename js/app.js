/*****************************************
Treehouse Fullstack Javascript Techdegree,
project #4: "Tic-Tac-Toe v3"
by Ole Petter Baugerød Stokke
www.olepetterstokke.no/treehouse/project4
*****************************************/

/****************************************
quick note about the logic of this game:

the board is an array, which looks like this when empty
    0,0,0,
    0,0,0,
    0,0,0

when the players (or "AI") makes a move, they
fill the right index with their respective number (1 or 2).
then we can check for winners, for example a row like
    x,x,x,
    1,1,1,
    x,x,x
by ignoring the indexes indicated with x-es,
and just checking for 1 or 2's positions, in checkBoard()
*****************************************/

let board = [];             //setting up the board
let xTurn = true;           //x starts the game
let player1 = "";           //name of player1 (O)
let player2 = "";           //name of player2 (X)
let computerMatch = false;  //playing against computer?

//setting up the screens on startup
$("#player-input, .board, .screen-win").hide();
$("#player2").toggleClass("active");

//****************************************
//*** BUTTONS ****************************
//****************************************

//player vs player-button
$("#btn-pvp").click((event) => {
    $("#start").hide();
    $("#player-input").show();
});

//player vs computer-button
$("#btn-pvc").click((event) => {
    player1 = "You"; //using predefined names
    player2 = "Computer";
    computerMatch = true;
    startNewGame();
});

//start the game-button, on player names input-screen
$(".btn-start").click((event) => {
    if ($("#input-player1").val() != "" && //validating the inputs
    $("#input-player2").val() != "") { 
        player1 = $("#input-player1").val(); //fetching player names
        player2 = $("#input-player2").val();
        $("#player1-name").html(player1); //output player names
        $("#player2-name").html(player2);
        startNewGame();
    }
});    

//play again-button, after a win/tie
$(".btn-restart").click((event) => {
    startNewGame();
});    

//****************************************
//*** INTERFACE **************************
//****************************************

//hovering the board boxes
$(".box").hover (
    // -> mouse in
    (event) => { 
        if ($(event.target).hasClass("box-filled-1") ||
            $(event.target).hasClass("box-filled-2")) {
                //do nothing if allready filled
        } else {
            if (xTurn){
                $(event.target).css("background-image","url('./img/x.svg')");
            } else {
                $(event.target).css("background-image","url('./img/o.svg')");
            }}}, 

    // <- mouse out
    (event) => { 
            $(event.target).css("background-image",""); //reset, css takes over    
    });

//clicking the board boxes
$(".box").click((event) => {
    if ($(event.target).hasClass("box-filled-1") ||
        $(event.target).hasClass("box-filled-2")) {
            //box filled, do nothing
        } else { 
            if (xTurn) { 
                $(event.target).addClass("box-filled-2"); //add X visually
                board[$(event.target).index()] = 2; //add X in board array
            } else {
                $(event.target).addClass("box-filled-1");
                board[$(event.target).index()] = 1;
            }
            checkBoard(); //check for winners            
        }
});

//****************************************
//*** GAMEPLAY ***************************
//****************************************

//start a new fresh game
function startNewGame () {
    $(".screen-start, .screen-win").hide();
    $(".board").show();
    
    board = [0,0,0,0,0,0,0,0,0]; //reset board array
    
    $(".box").removeClass("box-filled-1"); //reset box visuals
    $(".box").removeClass("box-filled-2");

    if (computerMatch && xTurn) { //should computer move?
        setTimeout(computerMove,300);
    }
}

//check the board for winners/tie
function checkBoard () {

    switchPlayers(); //do this now, so we can computerMove further down

    //does O have a winning row, of the 8 possible ones?
    if (board[0] === 1 && board[1] === 1 && board[2] === 1 || 
        board[3] === 1 && board[4] === 1 && board[5] === 1 ||
        board[6] === 1 && board[7] === 1 && board[8] === 1 ||
        board[0] === 1 && board[3] === 1 && board[6] === 1 ||
        board[1] === 1 && board[4] === 1 && board[7] === 1 ||
        board[2] === 1 && board[5] === 1 && board[8] === 1 ||
        board[0] === 1 && board[4] === 1 && board[8] === 1 ||
        board[6] === 1 && board[4] === 1 && board[2] === 1) {
            win(1); //yes she does, go to win screen
    }

    //does X have a winning row?
    else if (
        board[0] === 2 && board[1] === 2 && board[2] === 2 || 
        board[3] === 2 && board[4] === 2 && board[5] === 2 ||
        board[6] === 2 && board[7] === 2 && board[8] === 2 ||
        board[0] === 2 && board[3] === 2 && board[6] === 2 ||
        board[1] === 2 && board[4] === 2 && board[7] === 2 ||
        board[2] === 2 && board[5] === 2 && board[8] === 2 || 
        board[0] === 2 && board[4] === 2 && board[8] === 2 ||
        board[6] === 2 && board[4] === 2 && board[2] === 2) {
            win(2);
    }

    //is it a tie? all values in array sum to at least 13 without any victor
    else if (board.reduce((number,all) => number+all,0) >= 13) {
            win(0);
    }

    //hasn't any of the above taken place? let computer move, if she should
    else {
        if (computerMatch && xTurn) { 
            setTimeout(computerMove,300);
        }
    }

    //if nothing else, we've allready switched players, ready for another turn
}

//making the opposite player the active player
function switchPlayers() {
    $("#player2, #player1").toggleClass("active"); //visually
    xTurn = !xTurn; //and in the logic
}

//someone has won, or it's a tie
function win (victor) {

    //get the screens ready to go
    $(".board").hide();
    $(".screen-win").show();
    $(".screen-win").removeClass().addClass("screen screen-win");

    //styling and displaying the results
    if (victor === 1) { //O won
        $(".screen-win").addClass("screen-win-one");
        $(".message").html(player1 + " won!");
    } else if (victor === 2) { //X won
        $(".screen-win").addClass("screen-win-two");
        $(".message").html(player2 + " won!");
    } else if (victor === 0) { //a tie
        $(".screen-win").addClass("screen-win-tie");
        $(".message").html("It's a Tie!");
    }
}

//****************************************
//*** ARTIFICIAL STUPIDITY ***************
//****************************************

//make the computer try a random box on the board, 
//and fill it if it's empty. if it's not, try again.
//calling this function with a slight delay makes it
//less obvious that the computer is dumb as a rock.
function computerMove () {
    let randomBox; 
    let stillTrying = true; 

    while(stillTrying) { 
        randomBox = Math.floor(Math.random() * 9); //let's try this one 
        if (board[randomBox] === 0) { //make the turn if box available
            board[randomBox] = 2; 
            $(".box").eq(randomBox).addClass("box-filled-2");
            stillTrying = false; //we're done
        }
            //if it's allready filled, she'll try again
    }     

    checkBoard();    
}