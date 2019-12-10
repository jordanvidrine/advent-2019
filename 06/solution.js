// THIS SOLUTION WORKED FOR EXAMPLE BUT NOT THE INPUT
// not sure what the issue is...

const fs = require('fs')
const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(/[)\r?\n]{1,}/)
}

const testMap = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`.toString().split(/[)\r\n]{1,}/)

function orbitCountChecksum(map) {
  let orbitCount = {}
  for (let i = 0; i < map.length; i += 2) {
    let orbitee = map[i]
    let orbiter = map[i+1]

    if (!(orbiter in orbitCount)) {
      let indirectOrbits = orbitCount[orbitee]
      orbitCount[orbiter] = indirectOrbits ? indirectOrbits + 1 : 1
    } else {
      let indirectOrbits = orbitCount[orbitee]
      orbitCount[orbiter] = indirectOrbits ? indirectOrbits + 1 :
      orbitCount[orbiter] + 1
    }
  }

  let reducedOrbitCount = 0;

  for (let key in orbitCount) {
    reducedOrbitCount += orbitCount[key]
  }

  return orbitCount;
}


// WORKING SOLUTION MODIFIED FROM
// https://github.com/mariotacke/advent-of-code-2019/blob/master/day-06-universal-orbit-map/orbits.js

function getInput(input) {
  const orbits = input
    .split('\n')
    .reduce((orbits, line) => {
      const [object1, object2] = line.trim().split(')');

      orbits[object2] = object1;

      return orbits;
    }, {});

  let totalNumberOfOrbits = 0;

  let objectsOrbitingAnother = Object.keys(orbits);

  for (let i = 0; i < objectsOrbitingAnother.length; i++) {
    const currentObject = objectsOrbitingAnother[i];

    let nextObject = orbits[currentObject];

    while (nextObject) {
      nextObject = orbits[nextObject];
      totalNumberOfOrbits += 1;
    }
  }

  return totalNumberOfOrbits;

};
