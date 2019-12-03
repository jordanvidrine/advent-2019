const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
const calculateFuelConsumption = mass => parseInt(mass / 3) - 2;
const calculateModuleFuelRequirement = (arr) => {
    return arr.reduce((accum, mass) => {
        return accum += calculateFuelConsumption(mass);
    }, 0);
};

console.log(calculateModuleFuelRequirement(input))
