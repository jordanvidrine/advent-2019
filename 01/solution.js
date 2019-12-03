const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(/\r?\n/).map(numberStr => Number(numberStr))
}

const calcFuel = (mass) => {
  return Math.floor(mass/3) - 2 > 0 ? Math.floor(mass/3) - 2 : 0
}

const calcFuelForFuel = (mass) => {
  let totalFuel = 0;
  // initialize additionalFuel
  let additionalFuel = Math.floor(mass/3) - 2

  while (additionalFuel >= 0) {
    totalFuel += additionalFuel;
    additionalFuel = Math.floor(additionalFuel/3) - 2;
  }
  return totalFuel;
}

function solve() {
  const input = getInput();

  const sum = input.reduce((acc, cur) => {
    acc += calcFuel(cur);
    return acc;
  }, 0)

  console.log('Answer', sum)
}

function solvePartTwo() {
  const input = getInput();

  const sum = input.reduce((acc,cur) => {
    acc += calcFuelForFuel(cur);
    return acc;
  }, 0)

  console.log('Answer', sum)
}

// part 1
solve()

// part 2
solvePartTwo()
