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

function solve() {

    let line1 = getInput()['line1']
    let line2 = getInput()['line2']

    let line1Directions = line1.map((instruction)=>{
        let direction = instruction.slice(0, 1)
        let distance = instruction.split(/[RLUD]/)[1]
        return {
            direction,
            distance
        }
    }
    )

    let line2Directions = line2.map((instruction)=>{
        let direction = instruction.slice(0, 1)
        let distance = instruction.split(/[RLUD]/)[1]
        return {
            direction,
            distance
        }
    }
    )

    // initialize starting points
    let line1X = 0
    let line1Y = 0
    let line2X = 0
    let line2Y = 0

    let vals = {
        "R": 1,
        "U": 1,
        "D": -1,
        "L": -1
    }

    // use Map() object instead of array
    // this solves O(n2) issue by comparing two objects rather than
    // using nested loops

    let line1Coords = new Map()
    let line2Coords = new Map()

    line1Directions.forEach((set,idx)=>{
        if (set.direction === 'R' || set.direction === 'L') {
            for (let i = 0; i < Number(set.distance); i++) {
                line1X += vals[set.direction];
                line1Coords.set(`X${line1X}Y${line1Y}`,line1Coords.size)
            }
        } else {
            for (let i = 0; i < Number(set.distance); i++) {
                line1Y += vals[set.direction];
                line1Coords.set(`X${line1X}Y${line1Y}`,line1Coords.size)
            }
        }
    }
    )

    line2Directions.forEach((set,idx)=>{
        if (set.direction === 'R' || set.direction === 'L') {
            for (let i = 0; i < Number(set.distance); i++) {
              line2X += vals[set.direction];
              line2Coords.set(`X${line2X}Y${line2Y}`,line2Coords.size)
            }
        } else {
            for (let i = 0; i < Number(set.distance); i++) {
                line2Y += vals[set.direction];
                line2Coords.set(`X${line2X}Y${line2Y}`,line2Coords.size)
            }
        }
    }
    )

    let intersections = getIntersections(line1Coords, line2Coords)

    return getShortestManhattanDistance(intersections)
}

function getIntersections(line1, line2) {
  let intersections = []

  for (let key of line1) {
    if (line2.has(key[0]))
    intersections.push(`${key[0]}`)
  }

  return intersections;
}

function getShortestManhattanDistance(intersections) {
  return intersections.reduce((acc,cur) => {
    let parsedString = cur.split(/[XY]/)
    let X = parsedString[parsedString.length-2]
    let Y = parsedString[parsedString.length-1]
    let manhattanDistance = Math.abs(Number(X)) + Math.abs(Number(Y))
    if (manhattanDistance < acc) return manhattanDistance;
    return acc;
  },Infinity)
}

console.log(solve())
