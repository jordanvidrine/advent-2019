const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(',').map(numberStr => Number(numberStr))
}
