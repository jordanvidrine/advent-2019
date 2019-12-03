// prompt - https://adventofcode.com/2019/day/3

const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  input = input.toString().split(/\r?\n/)
  let line1 = input[0].split(',')
  let line2 = input[1].split(',')
  return {
    line1,
    line2
  }
}

console.log(getInput())
