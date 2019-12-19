const fs = require('fs')

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(',').map(numberStr => Number(numberStr))
}

// Opcode 1 = adds two positions, stores sum at third position
// Opcode 2 = mults two positions, stores result at third position
// Opcode 99 = halt
// for 1 and 2, after performing math, move forward 4 spaces

// Opcode 3 = takes a single integer as input and saves it to the position given by its only parameter.
// For example, the instruction 3,50 would take an input value and store it at address 50.

// Opcode 4 = outputs the value of its only parameter.
// For example, the instruction 4,50 would output the value at address 50.

// Opcode 5 = Jump-if-true
// if the first param is non 0, it sets the instruction pointer to the value from the second
// parameter, otherwise it does nothing

// Opcode 6 = Jump-if-false
// if the first param is 0, it sets the instruction pointer to the value from the second parameter
// otherwise it does nothing

// Opcode 7 =  less than
// if the first param is less than the second param, it stores 1 in the position given by the third
// param, otherwise it stores 0

// Opcode 8 = equals
// if the first poaram is equal to the second param, it stores 1 in the position given by the third
// param, otherwise it stores 0

// Opcode 9 = relative base instruction
// adjusts the relative base by the value of its only parameter
// ie. rb = 2000 , insturction is [109,19] rb = 2019
// next instruction is [204,-34] the value at address 2019 + -34 would be output [1985]

// Add Parameter mode functionality
// currently the program only operates with 0, Position Mode
// values are interpredted as positions IE. 55, means value at position 55

// Parameter Mode 1 = Immediate mode
// number literally equals value, 55 = 55

// Parameter Mode 2 = Relative mode
// behaves similar to Position Mode, its interpreted as a position
// can be read from or written to
// they coiunt from the relative base (starts at 0)
// refers to itself PLIUS the relative base ie. rb = 2000, parameter = -15, memory = value at position 1985

// Parameter modes are stored in the same value as the instruction's opcode.
// opcode is the rightmost two digits of the first value in an instruction.

// Parameter modes are single digits, one per parameter
// read right-to-left from the opcode

// three parameter codes r stored after Opcode
// tens, hundreds, then thousands place
// Any missing modes are 0.

//  1002,4,3,4,33
//    02 => multiple
//   0   => position mode (1st param)
//  1    => immedite mode (2nd param)
// 0     => position mode (3rd param computed since none is present)

// this will multiply the first two paramaters
// param 1 (4, position mode, => 33) * param 2 (3, immediate mode => 3) => 33 * 3 = 99
// store at param 3 (4, position mode => 33)
// thus 1002,4,3,4,33 becomes 1002,4,3,4,99

// parameters that an instructions writes to will NEVER be in immediate mode!!

// NEW THINGS TO REMEMBER
// It is important to remember that the instruction pointer should
// increase by the number of values in the instruction after the instruction
// finishes. Because of the new instructions, this amount is no longer always 4.

// Integers can be negative: 1101,100,-1,4,0 is a valid program
// (find 100 + -1, store the result in position 4).

// the program starts with a 3, so will require an input, which should be the ID of the system it is testing
// in this case, input 1

// It will then perform a series of diagnostic tests confirming that various parts of the Intcode computer,
// like parameter modes, function correctly. For each test, it will run an output instruction indicating
// how far the result of the test was from the expected value, where 0 means the test was successful.
// Non-zero outputs mean that a function is not working correctly; check the instructions that were
// run before the output instruction to see which one failed.

// Finally, the program will output a diagnostic code and immediately halt.
// This final output isn't an error; an output followed immediately by a halt means the program finished.
// If all outputs were zero except the diagnostic code, the diagnostic program ran successfully.

// change getDistance to output the new instruction pointer or mimic old version
// if instruction = 5,6,7,8 do something different, otherwise, return i + new i

function intCodeComp(computerInput,userInput) {
    var instructions = computerInput
    .concat(Array.from({ length: 1024 }).map(() => 0));

    let rBase = 0;
    let output = []

    for ( let i = 0; instructions[i] !== 99; i = getInstructionPointer(instructions[i], i, instructions, rBase)) {

    let currentInstruction = instructions[i]

    if (i === 205) {
      debugger;
    }

    // prepend instruction if not length of 5
    if (currentInstruction.toString().length <= 5) {
      currentInstruction = prepender(currentInstruction)
    }

      // convert to object with param data
    currentInstruction = getOpCodeAndParams(currentInstruction);

    if (currentInstruction.opCode === '03') {
      let storage = currentInstruction.paramMode1 === '0' ? instructions[i+1] // position mode
      : instructions[i+1] + rBase // relative mode

      instructions[storage] = userInput
    }

    if (currentInstruction.opCode === '01') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2]
      : currentInstruction.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
      : instructions[instructions[i+2]]

      let storage = currentInstruction.paramMode3 === '0' ? instructions[i+3] // position mode
      : instructions[i+3] + rBase // relative mode

      instructions[storage] = input1 + input2
    }

    if (currentInstruction.opCode === '02') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2]
      : currentInstruction.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
      : instructions[instructions[i+2]]

      let storage = currentInstruction.paramMode3 === '0' ? instructions[i+3] // position mode
      : instructions[i+3] + rBase // relative mode

      instructions[storage] = input1 * input2
    }

    if (currentInstruction.opCode === '04') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      console.log(input1)
    }

    if (currentInstruction.opCode === '07') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2]
      : currentInstruction.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
      : instructions[instructions[i+2]]

      let storage = currentInstruction.paramMode3 === '0' ? instructions[i+3] // position mode
      : instructions[i+3] + rBase // relative mode

      if (input1 < input2) {
        instructions[storage] = 1;
      } else {
        instructions[storage] = 0;
      }
    }

    if (currentInstruction.opCode === '08') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2]
      : currentInstruction.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
      : instructions[instructions[i+2]]

      let storage = currentInstruction.paramMode3 === '0' ? instructions[i+3] // position mode
      : instructions[i+3] + rBase // relative mode

      if (input1 === input2) {
        instructions[storage] = 1;
      } else {
        instructions[storage] = 0;
      }
    }

    if (currentInstruction.opCode === '09') {
      let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
      : currentInstruction.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
      : instructions[instructions[i+1]] // position mode

      rBase += input1
    }

  }
}

function getOpCodeAndParams(instruction) {
  instruction = instruction.toString()
  let opCode = instruction[instruction.length-2] + instruction[instruction.length-1]
  let paramMode1 = instruction[instruction.length-3]
  let paramMode2 = instruction[instruction.length-4]
  let paramMode3 = instruction[0]

  return {
    opCode,paramMode1,paramMode2,paramMode3
  }

}

function getInstructionPointer(instruction, i, instructions, rBase) {
  instruction = prepender(instruction.toString())
  let opCodeAndParams = getOpCodeAndParams(instruction)

  if (
      opCodeAndParams.opCode === '03'
      || opCodeAndParams.opCode === '04'
      || opCodeAndParams.opCode === '09'
  ) return i + 2
  if (
      opCodeAndParams.opCode === '01'
      || opCodeAndParams.opCode === '02'
      || opCodeAndParams.opCode === '07'
      || opCodeAndParams.opCode === '08'
  ) return i + 4

  if (opCodeAndParams.opCode === '05') {
        let input1 = opCodeAndParams.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
        : opCodeAndParams.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
        : instructions[instructions[i+1]] // position mode

        let input2 = opCodeAndParams.paramMode2 === '1' ? instructions[i+2]
        : opCodeAndParams.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
        : instructions[instructions[i+2]]

    if (input1 !== 0) {
      return input2
    } else {
      return i + 3
    }
  }

  if (opCodeAndParams.opCode === '06') {
        let input1 = opCodeAndParams.paramMode1 === '1' ? instructions[i+1] // immediate mode, literal
        : opCodeAndParams.paramMode1 === '2' ? instructions[instructions[i+1] + rBase] // relative mode
        : instructions[instructions[i+1]] // position mode

        let input2 = opCodeAndParams.paramMode2 === '1' ? instructions[i+2]
        : opCodeAndParams.paramMode2 === '2' ? instructions[instructions[i+2] + rBase]
        : instructions[instructions[i+2]]

    if (input1 === 0) {
      return input2
    } else {
      return i + 3
    }
  }
}

function prepender(instruction) {
  instruction = instruction.toString()
  let prepend = ''
  if (instruction.length <= 5) {
    for (let i = instruction.length; i < 5; i++) {
      prepend = `0` + prepend
    }
  }
  instruction = prepend.concat(instruction.toString())
  return instruction
}

console.log(intCodeComp(getInput(),1))
