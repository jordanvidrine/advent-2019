const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(',').map(numberStr => Number(numberStr))
}

function dayTwo() {
  let inputs = getInput();

  for (let i = 0; inputs[i] !== 99; i += 4) {
    let sum;
    if (inputs[i] === 1) {
      inputs[inputs[i+3]] = inputs[inputs[i+1]] + inputs[inputs[i+2]]
    } else {
      inputs[inputs[i+3]] = inputs[inputs[i+1]] * inputs[inputs[i+2]]
    }
  }
  console.log('Answer', inputs[0])
}

dayTwo()

// Intcode program is a list of integers, separated by commas -> 1,0,0,3,99
// To run one, look at the first integer (position 0)
// Here you will find an opcode - either 1, 2 or 99, that indicates what to do
// ex. 99 means the program is finished and should stop

// 1 adds together numbers read from two positions and stores the result in a third position
// the three integers IMMEDIATELY AFTER the opcode tell you the three positions
// the first two indicate the positions from which you should read the input values
// the third indicates the position at which the output should be stored

// ex. 1,10,20,30 should read positions 10 and 20, add those values, and then
// overwrite the value at position 30 with their sum

// opcode 2 works just like 1, except it MULTIPLIES the values

// once done with an opcode, move forward 4 positions to the next op code.

// ex. 1,9,10,3,2,3,11,0,99,30,40,50
// 1, 9, 10, 3
// 2, 3, 11, 0
// 99,
// 30, 40, 50
