const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split('').map(number => Number(number))
}

function createLayers(width, height) {
    let input = getInput()

    let image = [];

    while (input.length > 0) {

        let layer = [];

        for (let i = 0; i < height; i++) {
            layer.push(input.splice(0,width))
        }

        image.push(layer)

    }

    return image

}

function getTargetLayer() {
    let image = createLayers(25,6)

    let zeroDigits = {};

    // count zeroes

    for (let i = 0; i < image.length - 1 ; i++) {

        for (let j = 0; j < image[i].length; j++) {

            let zeroes = image[i][j].filter(number => number == 0)

            if (`${i}` in zeroDigits) {
                zeroDigits[`${i}`] += zeroes.length;
            } else {
                zeroDigits[`${i}`] = zeroes.length;
            }
        }
    }

    // find layer with least amount of zeroes

    let layerWithLeastZeroes = undefined;
    let numOfZeroes = Infinity

    for (key in zeroDigits) {
        if (zeroDigits[key] < numOfZeroes) {
            numOfZeroes = zeroDigits[key]
            layerWithLeastZeroes = key
        }
    }

    let targetLayer = image[Number(layerWithLeastZeroes)]

    return targetLayer

}

function multDigits(layer) {
    debugger;
    let ones = 0;
    let twos = 0;

    for (let i = 0; i < layer.length; i++) {
        for (let j = 0; j < layer[i].length; j++) {
            if (layer[i][j] == 1) {
                ones++
            }

            if (layer[i][j] == 2) {
                twos++
            }
        }
    }

    return ones * twos
}

// PART TWO

function blankImage(layers) {
    let width = layers[0][0].length
    let height = layers[0].length

    let blankImage = [];

    for (let i = 0; i < height; i++) {
        let layer = [];
        for (let j = 0; j < width; j++) {
            layer.push('0')
        }
        blankImage.push(layer)
    }

    return blankImage
}

function buildImage(layers) {
    let blankImage = blankImage(layers)

    let imageMap = imageMap(layers)
}

function imageMap(layers) {

    let imageMap = {};

    for (let y = 0; y < layers[0].length; y++) {

        for (let x = 0; x < layers[0][0].length; x++) {

            let xy = []

            for (let inner = 0; inner < layers.length ; inner++) {
                xy.push(layers[inner][y][x])
            }

            imageMap[`${x},${y}`] = xy

        }

    }
    return imageMap
}

// console.log(multDigits(getTargetLayer()))
