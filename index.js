const startBtn = document.querySelector(".start")
const hardBtn = document.querySelector(".hard")
const easyBtn = document.querySelector(".easy")
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
const upBtn = document.querySelector(".up")
const downBtn = document.querySelector(".down")
const rightBtn = document.querySelector(".right")
const leftBtn = document.querySelector(".left")
const width = 10

let squares = []
let currentTwister = [2, 1, 0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerID = 0


//Create the grid for the game 
function createGrid () {
    for (let i = 0; i < width*width; i++) {
        const gridSquare = document.createElement("div")
        gridSquare.classList.add("square")
        grid.appendChild(gridSquare)
        squares.push(gridSquare)
    }
}
createGrid()

//Create the twister on the grid 
currentTwister.forEach(index => squares[index].classList.add("twister"))


//Start game function 
function startGame () {
    timerID =setInterval(move, intervalTime)
}
startBtn.addEventListener("click", startGame)


//Function to move the twister on the grid 
function move () {
    if (
        (currentTwister[0] + width >= width*width && direction === width) ||
        (currentTwister[0] % width === width-1 && direction === 1) ||
        (currentTwister[0] % width === 0 && direction === -1) ||
        (currentTwister[0] % width === 0 && direction === -width) ||
        squares[currentTwister[0] + direction].classList.contains("twister")
    )
    return clearInterval(timerID)
    const tail = currentTwister.pop()
    squares[tail].classList.remove("twister")
    currentTwister.unshift(currentTwister[0] + direction)

    if (squares[currentTwister[0]].classList.contains("apple")) {

        squares[currentTwister[0]].classList.remove("apple")
        squares[tail].classList.add("twister")
        currentTwister.push(tail)
        generateApples()
        score++
        scoreDisplay.textContent = score

        clearInterval(timerID)
        intervalTime = intervalTime * speed
        timerID = setInterval(move, intervalTime)

    }
    squares[currentTwister[0]].classList.add("twister")
}


//Function to generate apples 
function generateApples () {
    do {
        appleIndex = Math.floor(Math.random()* squares.length)
    }while(squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApples()

//Buttons with events to listen for the direction the twister should be going
rightBtn.addEventListener("click", function goRight () {
    direction = 1
})

leftBtn.addEventListener("click", function goLeft () {
    direction = -1
})

upBtn.addEventListener("click", function goUp () {
    direction = -width
})

downBtn.addEventListener("click", function goDown () {
    direction = +width
})