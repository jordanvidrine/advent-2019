const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString()
}

function calculateOrbits(input) {
  const orbits = input
    .split('\n')
    .reduce((orbits, line) => {
      const [object1, object2] = line.trim().split(')');

      orbits[object2] = object1;

      return orbits;
    }, {});

    let stepsToSanta = 0;
    let currentPlanet = orbits['YOU'];
    let nextPlanet = orbits[currentPlanet]

    while (nextPlanet !== orbits['SAN']) {
      nextPlanet = orbits[nextPlanet]
      stepsToSanta += 1
    }

  return {
    'YOU': orbits['YOU'],
    'SAN': orbits['SAN'],
    stepsToSanta
  }

};

console.log(calculateOrbits(getInput()))
