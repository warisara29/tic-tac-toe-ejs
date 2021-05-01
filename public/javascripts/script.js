const WINNING_COMBINATIONS3 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const WINNING_COMBINATIONS4 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
]
const WINNING_COMBINATIONS5 = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
]
const WINNING_COMBINATIONS6 = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35],
    [0, 7, 14, 21, 28, 35],
    [5, 10, 15, 20, 25, 30],
]

// new valiable
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "",]
const winningMessage = () => `Player ${currentPlayer} has won!!`
const drawMessage = () => `Game ended is a draw!`
const currentPlayerTurn = () => `${currentPlayer}'s turn`
const selectBoard = document.getElementById("select-board")
const statusDisplay = document.getElementById("status-paragraph")

// valiables for store in datebase
let firestore = firebase.firestore()
const currentDate = new Date();
const timestamp = currentDate.getTime();

statusDisplay.innerHTML = currentPlayerTurn()

// function select bord type
function boardType() {
    const boardType = selectBoard.options[selectBoard.selectedIndex].value
    // check condition
    if (boardType == 1) {
        // console.log(boardType)
        let gameState = ["", "", "", "", "", "", "", "", ""]
        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        }
        handleRestartGame()
        $("#board").empty()
        $("#board").css("grid-template-columns", "repeat(3, auto)")
        const cell = 3 * 3
        for (i = 0; i < cell; i++) {
            $("#board").append("<div class='cell'" + "data-cell-index=" + i + "></div>");
        }
        function handleCellPlayed(clickedCell, clickedCellIndex) {
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
        }

        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = WINNING_COMBINATIONS3[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: winningMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});     
                return;
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: drawMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            handlePlayerChange();
        }

        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('#restartButton').addEventListener('click', handleRestartGame);

    }
    else if (boardType == 2) {

        let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        }

        handleRestartGame()
        $("#board").empty()
        $("#board").css("grid-template-columns", "repeat(4, auto)")
        const cell = 4 * 4
        for (i = 0; i < cell; i++) {
            $("#board").append("<div class='cell'" + "data-cell-index=" + i + "></div>");
        }

        function handleCellPlayed(clickedCell, clickedCellIndex) {
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
        }

        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 9; i++) {
                const winCondition = WINNING_COMBINATIONS4[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                let d = gameState[winCondition[3]]
                if (a === '' || b === '' || c === '' || d === '') {
                    continue;
                }
                if (a === b && b === c && c === d) {
                    roundWon = true;
                    break
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: winningMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true}); 
                return;
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: drawMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            handlePlayerChange();
        }

        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('#restartButton').addEventListener('click', handleRestartGame);
    }
    else if (boardType == 3) {

        let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        }

        handleRestartGame()
        $("#board").empty()
        $("#board").css("grid-template-columns", "repeat(5, auto)")
        const cell = 5 * 5
        for (i = 0; i < cell; i++) {
            $("#board").append("<div class='cell'" + "data-cell-index=" + i + "></div>");
        }
        
        function handleCellPlayed(clickedCell, clickedCellIndex) {
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
        }

        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 11; i++) {
                const winCondition = WINNING_COMBINATIONS5[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                let d = gameState[winCondition[3]];
                let e = gameState[winCondition[4]]
                if (a === '' || b === '' || c === '' || d === '' || e === '') {
                    continue;
                }
                if (a === b && b === c && c === d && d === e) {
                    roundWon = true;
                    break
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: winningMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: drawMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            handlePlayerChange();
        }

        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('#restartButton').addEventListener('click', handleRestartGame);
    }
    else if (boardType == 4) {

        let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        
        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        }
        handleRestartGame()
        $("#board").empty()
        $("#board").css("grid-template-columns", "repeat(6, auto)")
        const cell = 6 * 6
        for (i = 0; i < cell; i++) {
            $("#board").append("<div class='cell'" + "data-cell-index=" + i + "></div>");
        }
        
        function handleCellPlayed(clickedCell, clickedCellIndex) {
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
        }

        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 13; i++) {
                const winCondition = WINNING_COMBINATIONS6[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                let d = gameState[winCondition[3]];
                let e = gameState[winCondition[4]];
                let f = gameState[winCondition[5]];
                if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '') {
                    continue;
                }
                if (a === b && b === c && c === d && d === e && e === f) {
                    roundWon = true;
                    break
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: winningMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                firestore.collection("game history").doc().set({ 
                    result: drawMessage(),
                    player: $("#player-name").val(),
                    played: firebase.firestore.FieldValue.serverTimestamp()
                }, 
                {merge: true});
                return;
            }

            handlePlayerChange();
        }

        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('#restartButton').addEventListener('click', handleRestartGame);
    }
}

// get data from database
const playerList = []
firestore.collection("game history").where("player", "!=", "")
.onSnapshot((querySnapshot) => {
    var playerlist = []
    var player_data = [];
    querySnapshot.forEach((doc) => {
        var player = []
        if (player.includes((doc.data().played)) == true) {
            
        } else if (player.includes((doc.data().played)) == false) {
            var date = (doc.data().played).toDate().toLocaleString()
            player.push(date);
            player.push(doc.data().player);
            player.push(doc.data().result)
        }
        player_data.push(player)
    });
    playerlist.push(player_data)
    // console.log(playerlist);
    playerList.push(playerlist)
});


// on click history button
$('#historyButton').on('click', function() {
    $('#myModal').css("display", "block")
    $('html, body').animate({
        scrollTop: $("#myModal").offset().top
    }, 800);

    console.log(playerList)
    playerList.forEach(function(list) {
        // var count = list[0]
        // console.log(count[0])
        console.log(list[0].length)
        for (i=0; i <list[0].length; i++) {
            var row = "row" + i
            var tablerow = "<tr id="+ row +"></tr>"
            $("#"+row+"").remove()
            $("#t-body").append(tablerow)
            console.log(list[0][i])
            for (j=0; j < list[0][i].length; j++) {
                $("#"+row+"").append(
                    "<td id="+'td'+">" + list[0][i][j] + "</td>"
                )
            }
        }
    })
})

// on click close history modal
$('#close-modal').on('click', function() {
    $('#myModal').css("display", "none")
})

// on click play button
$('#play-btn').on('click', function() {
    $('#inputname-form').css("display", "none")
    $('#history-btn-div').css("display", "block")
    $('#playground').css("display", "block")
})