const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split('\n').map(numberStr => Number(numberStr))
}

const calcFuel = (mass) => {
  return Math.floor(mass/3) -2
}

async function solve() {
  const input = getInput();

  const sum = input.reduce((acc, cur) => {
    acc += calcFuel(cur);
    return acc;
  }, 0)

  console.log('Answer', sum)
}

solve()
