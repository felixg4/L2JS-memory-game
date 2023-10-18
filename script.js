const grid = document.getElementById('grid')
const modal = document.getElementById('myModal')
window.onclick = (e) => {if (e.target == modal) modal.style.display = 'none'}
const uncoveredImages = [
    "https://www.loudandquiet.com/files/2018/11/eyedress-sensitiveg-artwork.jpg",
    "https://i.scdn.co/image/ab6761610000e5eb13a6e324c8ad5437b4bb4c5d",
    "https://narcmagazine.com/wp-content/uploads/2020/07/Eyedress__1595586385_92.21.156.95.jpg",
    "https://www.loudandquiet.com/files/2019/05/Mac-Demarco.jpg",
    "https://www.silentradio.co.uk/wp-content/uploads/2017/05/Mac-DeMarco-This-Old-Dog-2.jpg",
    "https://f4.bcbits.com/img/a1497608370_10.jpg",
    "https://images.genius.com/62f8b1d5c7aa819d67bc6857d9ac9b77.1000x1000x1.png",
    "https://www.loudandquiet.com/files/2022/07/Steve-Lacy-Gemini-Rights.jpeg"
]
const coveredImageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
let allowInteraction = true
let numClicks = 0
const matchPairs = []
const coinsFlippedOver = [];
const score = document.createElement('span')
score.style.gridColumn = 'span 3'
const reset = document.createElement('button')
reset.textContent = 'reset'
reset.onclick = initialize
function initialize() {
    matchPairs.splice(0, matchPairs.length)
    coinsFlippedOver.splice(0, coinsFlippedOver.length)
    allowInteraction = true
    numClicks = 0

    const availableNumbers = []
    for (let i = 0; i < 16; i++) availableNumbers.push(i)
    for (let i = 0; i < 8; i++) {
        matchPairs.push([])
        for (let i = 0; i < 2; i++) matchPairs[matchPairs.length - 1].push(availableNumbers.splice(Math.floor(Math.random() * availableNumbers.length), 1).pop())
    }
    delete availableNumbers
    if (grid.childElementCount == 18) for (let i = 0; i < 16; i++) {
        grid.childNodes.item(i).src = coveredImageURL
        grid.childNodes.item(i).onclick = handleClick
    }
    else {
        for (let i = 0; i < 16; i++) {
            let ge = document.createElement('img')
            ge.id = i;
            ge.src = coveredImageURL
            grid.appendChild(ge)
            ge.onclick = handleClick
        }
    }
    score.textContent = `Clicks: ${numClicks}`
}

function handleClick(e) {
    if (!allowInteraction) return
    numClicks++;
    score.textContent = `Clicks: ${numClicks}`
    let id = parseInt(e.target.id)
    const matchingCoinPair = matchPairs.findIndex(mp => mp.includes(id))
    switch (coinsFlippedOver.length % 2) {
        // if an even # of coins have been flipped over, the user is trying to flip over a new coin that should stay flipped over until the user tries again and guesses wrong
        case 0:
            flipCoin(id, matchingCoinPair)
            break;
        // if an odd # of coins have been flipped over, the user is trying to find the matching coin to an already flipped over one.
        case 1:
            // user is trying to unflip a single flipped coin to begin a match pair that doesn't include the current single flipped coin
            if (id == coinsFlippedOver[coinsFlippedOver.length - 1]) unFlipCoin()
            // matching coin has been found
            if (matchPairs[matchingCoinPair].includes(coinsFlippedOver[coinsFlippedOver.length - 1])) {
                disableMatchPair(matchPairs[matchingCoinPair])
                flipCoin(id, matchingCoinPair)
            }
            // flip it over and unflip it quickly
            else {
                flipCoin(id, matchingCoinPair)
                allowInteraction = false;
                setTimeout(() => {
                    for (let i = 0; i < 2; i++) unFlipCoin()
                    allowInteraction = true;
                }, 1000)
            }
            break;
    }
    if (coinsFlippedOver.length == 16) {
        modal.children.item(0).children.item(0).textContent = `you won in ${numClicks} clicks`
        modal.style.display = 'block'
    }
}
function flipCoin(coinId, i) {
    coinsFlippedOver.push(coinId)
    document.getElementById(coinId).src = uncoveredImages[i]
}
function unFlipCoin() {
    if (coinsFlippedOver.length < 1) return 
    document.getElementById(coinsFlippedOver.pop()).src = coveredImageURL
}
function disableMatchPair(matchPair) {
    for (const m of matchPair) document.getElementById(m).onclick = ''
}