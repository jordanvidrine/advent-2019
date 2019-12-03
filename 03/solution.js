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

function drawLines() {

    let line1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72`
    let line2 = `U62,R66,U55,R34,D71,R55,D58,R83`

    // let line1 = getInput().line1
    // let line2 = getInput().line2

    let line1Directions = line1.split(',').map((instruction)=>{
        let direction = instruction.slice(0, 1)
        let distance = instruction.split(/[RLUD]/)[1]
        return {
            direction,
            distance
        }
    }
    )

    let line2Directions = line2.split(',').map((instruction)=>{
        let direction = instruction.slice(0, 1)
        let distance = instruction.split(/[RLUD]/)[1]
        return {
            direction,
            distance
        }
    }
    )

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

    let line1Coords = [{
        x: line1X,
        y: line1Y
    }]

    let line2Coords = [{
        x: line2X,
        y: line2Y
    }]

    line1Directions.forEach((set,idx)=>{
        debugger;
        if (set.direction === 'R' || set.direction === 'L') {
            for (let i = 0; i < Number(set.distance); i++) {
                line1X += vals[set.direction];
                line1Coords.push({
                    x: line1X,
                    y: line1Y
                })
            }
        } else {
            for (let i = 0; i < Number(set.distance); i++) {
                line1Y += vals[set.direction];
                line1Coords.push({
                    x: line1X,
                    y: line1Y
                })
            }
        }
    }
    )

    line2Directions.forEach((set,idx)=>{
        debugger;
        if (set.direction === 'R' || set.direction === 'L') {
            for (let i = 0; i < Number(set.distance); i++) {
                line2X += vals[set.direction];
                line2Coords.push({
                    x: line2X,
                    y: line2Y
                })
            }
        } else {
            for (let i = 0; i < Number(set.distance); i++) {
                line2Y += vals[set.direction];
                line2Coords.push({
                    x: line2X,
                    y: line2Y
                })
            }
        }
    }
    )

    let intersections = []

    line1Coords.forEach((coord)=>{
        for (let i = 0; i < line2Coords.length; i++) {
            if (coord.x === line2Coords[i].x && coord.y === line2Coords[i].y) {
                intersections.push(coord)
            }

        }
    }
    )

    return intersections.map((coords) => { return Math.abs((coords.x) + (coords.y))})

}

console.log(drawLines())
