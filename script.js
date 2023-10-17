const grid = document.getElementById('grid')
const matches = []
const uncoveredImages = [
    //urls
]
const availableNumbers = []
for (let i = 0; i < 16; i++) availableNumbers.push(i)
for (let i = 0; i < 8; i++) {
    matches.push([])
    for (let i = 0; i < 2; i++) matches[matches.length - 1].push(availableNumbers.splice(Math.floor(Math.random() * availableNumbers.length), 1))
}
delete availableNumbers
const coinsFlippedOver = [];
for (let i = 0; i < 16; i++) {
    let ge = document.createElement('img')
    ge.id = i;
    ge.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
    grid.appendChild(ge)
    ge.onclick = handleClick;
}

function handleClick(e) {
    let id = e.target.id
    switch (coinsFlippedOver.length) {
        case 0:
            flipOver(id, true)
        case 1:
            let matchingCoin = matches.find(m => m.includes(id))
            matchingCoin.splice(matchingCoin.indexOf(id), 1)
            flipOver(id, coinsFlippedOver.includes(matchingCoin[0]))
    }
}
function flipOver(id, leaveFlipped) {
    document.getElementById(id).src = uncoveredImages
    if (leaveFlipped) {
        coinsFlippedOver.splice(coinsFlippedOver.indexOf(id), 1)
    } else {
        coinsFlippedOver.push(id)
    }
}