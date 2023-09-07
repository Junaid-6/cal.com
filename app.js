const optionContainer = document.querySelector('.option-container')
let  gamesBoardContainer = document.querySelector('#game-boardcontainer')
const flipButton = document.querySelector('#flip-button')
const startButton = document.querySelector('#start-button') 
let infoDisplay = document.querySelector('#info')
let trun = document.querySelector('#trun-display')

let angle = 90
function flip(){   
    trun.textContent = angle + 'vertical'
    if(angle === 90) { angle = 0} else { angle = 90}
    const optionShips = Array.from(optionContainer.children)
    optionShips.forEach(optionShip => optionShip.style.transform ='rotate('+angle+'deg)')
    console.log(angle)
}

const width = 10
function createContainer(color, user){
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add('game-board')
    gameBoardContainer.style.backgroundColor = color
    gameBoardContainer.id = user
    for(let i = 0; i < width*width; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = i
        gameBoardContainer.append(block)

    }
    gamesBoardContainer.append(gameBoardContainer)

}
createContainer('pink', 'player')
createContainer('red', 'computer')
 
 

flipButton.addEventListener('click',flip)


// Creating Ships
class Ships{
    constructor(name, lenght){
        this.name = name
        this.lenght = lenght
    }
}

const destroyer = new Ships('destroyer-color',2)
const submarine = new Ships('submarine-color',3)
const cruiser = new Ships('cruiser-color',3)
const battelShip = new Ships('battel-Ship-color',4)
const carrier = new Ships('carrier-color',5)

const ships = [destroyer,submarine,cruiser,battelShip,carrier]
let placedShip = []
function addShipPiece(user,ship,id){
    const allBoardBlocks = document.querySelectorAll(user+' div') 
    let randomBoolean, isHorizontal
    let randomStartIndex
    if(user === '#computer'){
     randomBoolean = Math.random() < 0.5
     isHorizontal = randomBoolean
     randomStartIndex =Math.floor(Math.random()*width*width) 
    }else{
        if(angle === 0) isHorizontal = true
        else isHorizontal = false
        randomStartIndex = id
    } 
    let shipBlocks = []
    for(let i = 0; i < ship.lenght; i++){
        if(isHorizontal){
            shipBlocks.push(allBoardBlocks[Number(randomStartIndex)+i])
            placedShip.push(Number(randomStartIndex)+i)
        }
        else{
            shipBlocks.push(allBoardBlocks[Number(randomStartIndex)+i*width])
            placedShip.push(Number(randomStartIndex)+i*width)
        }
    }

    console.log(placedShip)
    shipBlocks.forEach(shipBlock=>{
        shipBlock.classList.add(ship.name)
    })
   if(user === '#player') dragedShip.remove()
} 
ships.forEach(ship=>addShipPiece('#computer',ship)) 

// Drag player ships
const allPlayerBlocks = document.querySelectorAll('#player div')
allPlayerBlocks.forEach(playerBlock=>{
     playerBlock.addEventListener('drop', dropShip)
     playerBlock.addEventListener('dragover', dragOver) 
})
const optionShips = Array.from(optionContainer.children)
optionShips.forEach(optionShip=> optionShip.addEventListener('dragstart', dragStart)) 
 
let dragedShip

function dragStart(e){
    dragedShip = e.target  
}
function dragOver(e){
    e.preventDefault()
}
function dropShip(e){
    const shipId = e.target.id
    const ship = ships[dragedShip.id]
    addShipPiece('#player',ship,shipId)
}
 