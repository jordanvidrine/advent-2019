const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(',').map(numberStr => Number(numberStr))
}

function dayTwo(noun,verb) {
  let inputs = getInput();
  inputs[1] = noun;
  inputs[2] = verb;

  for (let i = 0; inputs[i] !== 99; i += 4) {
    let sum;
    if (inputs[i] === 1) {
      inputs[inputs[i+3]] = inputs[inputs[i+1]] + inputs[inputs[i+2]]
    } else {
      inputs[inputs[i+3]] = inputs[inputs[i+1]] * inputs[inputs[i+2]]
    }
  }
  return inputs[0]
}

// part one
console.log(dayTwo(12,2))

// part two
function dayTwoPartTwo() {
  for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
      if (dayTwo(i,j) === 19690720) return `${i}${j}`
    }
  }
}

console.log(dayTwoPartTwo())
