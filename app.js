document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const width = 4;
    let squares = []
    let score = 0

    //creating the playing board
    function createBoard(){
        for(let i = 0; i < width * width; i++){
            const square = document.createElement('div')
            square.innerHTML = "0"
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }

    createBoard()

    //generate a new number
    function generate(){
        const randomNumber = Math.floor(Math.random() * squares.length)
        //console.log(randomNumber)
        if (squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    function moveRight(){
        for(let i = 0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)
                //console.log(newRow )
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft(){
        for (let i = 0; i < 16; i ++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)
                //console.log(newRow )
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }
    
    function moveUp(){
        for(let i = 0; i < 4; i ++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+ width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)
            //console.log(newColumn )
            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }
    
    function moveDown(){
        for(let i = 0; i < 4; i ++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+ width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)
            //console.log(newColumn )
            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function combineRow(){
        for (let i = 0; i < 15; i++){
            if (squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineCol(){
        for (let i = 0; i < 12; i++){
            if (squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign functions to keys
    function control(e){
        if(e.key === 'ArrowLeft'){
            keyLeft()
        } else if (e.key === 'ArrowRight'){
            keyRight()
        } else if (e.key === 'ArrowUp'){
            keyUp()
        } else if (e.key === 'ArrowDown'){
            keyDown()
        } 
    }
    document.addEventListener('keydown', control)

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    
    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }
    
    function keyUp(){
        moveUp()
        combineCol()
        moveUp()
        generate()
    }
    
    function keyDown(){
        moveDown()
        combineCol()
        moveDown()
        generate()
    }

    //check for number 2048 in the squares to win
    function checkForWin(){
        for(let i = 0; i < squares.length; i ++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You WIN!'
                document.removeEventListener('keydown', control)
                setTimeout(clear, 3000)
            }
        }
    }

    //if there are no zeros on the board
    function checkForGameOver(){
        let zeros = 0
        for (let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = 'You LOSE!'
            document.removeEventListener('keydown', control)
            setTimeout(clear, 3000)
        }
    }

    function clear(){
        clearInterval(myTimer)
    }

    function addColors(){
        for(let i = 0; i < squares.length; i ++){
            if(squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#708090'
            else squares[i].style.backgroundColor = '#b0c4de'
        }
    }

    addColors()

    let myTimer = setInterval(addColors, 50)

})