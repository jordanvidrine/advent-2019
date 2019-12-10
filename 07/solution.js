var combinatorics = require('js-combinatorics')
const fs = require('fs')

cmb = combinatorics.permutation([5,6,7,8,9]);
let phaseSettings = cmb.toArray()

const getInput = () => {
  let input = fs.readFileSync('./input.txt')
  return input.toString().split(',').map(numberStr => Number(numberStr))
}

function amplifierController() {
  let highestCode = -Infinity;
  for (let i = 0; i < phaseSettings.length; i++) {
    let currentPhase = phaseSettings[i]

    let A = intCodeComp([currentPhase[0], 0])
    let B = intCodeComp([currentPhase[1], A])
    let C = intCodeComp([currentPhase[2], B])
    let D = intCodeComp([currentPhase[3], C])
    let E = intCodeComp([currentPhase[4], D])

    if (E > highestCode) {
      highestCode = E;
    }
  }
  return highestCode;
}

function amplifierFeedbackController(phase) {
// part 2 solution
}

function getHighestFeedbackPhase() {
// part 2 solution
}

function intCodeComp(userInput) {
    var instructions = getInput()
    let inputIndex = 0;
    let output = undefined;

    for ( let i = 0; instructions[i] < instructions.length; i = getInstructionPointer(instructions[i], i, instructions)) {

    let currentInstruction = instructions[i]

    if (currentInstruction == 99) {
      return output;
    }

    if (currentInstruction === 3) {
      instructions[instructions[i+1]] = userInput[inputIndex]
      inputIndex++
    } else {

      // prepend instruction if not length of 5
      if (currentInstruction.toString().length <= 5) {
        currentInstruction = prepender(currentInstruction)
      }

      // convert to object with param data
      currentInstruction = getOpCodeAndParams(currentInstruction);

      if (currentInstruction.opCode === '01') {
        // checks for immediate mode vs position mode
        let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] : instructions[instructions[i+1]]
        let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]
        let storage = instructions[i+3]
        instructions[storage] = input1 + input2
      }

      if (currentInstruction.opCode === '02') {
        let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] : instructions[instructions[i+1]]
        let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]
        let storage = instructions[i+3]
        instructions[storage] = input1 * input2
      }

      if (currentInstruction.opCode === '04') {
        let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] : instructions[instructions[i+1]]
        output = input1
      }

      if (currentInstruction.opCode === '07') {
        let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] :
        instructions[instructions[i+1]]
        let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]

        let storage = instructions[i+3]

        if (input1 < input2) {
          instructions[storage] = 1;
        } else {
          instructions[storage] = 0;
        }
      }

      if (currentInstruction.opCode === '08') {
        let input1 = currentInstruction.paramMode1 === '1' ? instructions[i+1] :
        instructions[instructions[i+1]]
        let input2 = currentInstruction.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]

        let storage = instructions[i+3]

        if (input1 === input2) {
          instructions[storage] = 1;
        } else {
          instructions[storage] = 0;
        }
      }

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

function getInstructionPointer(instruction, i, instructions) {
  instruction = prepender(instruction.toString())
  let opCodeAndParams = getOpCodeAndParams(instruction)

  if (
      opCodeAndParams.opCode === '03'
      || opCodeAndParams.opCode === '04'
  ) return i + 2
  if (
      opCodeAndParams.opCode === '01'
      || opCodeAndParams.opCode === '02'
      || opCodeAndParams.opCode === '07'
      || opCodeAndParams.opCode === '08'
  ) return i + 4

  if (opCodeAndParams.opCode === '05') {
    let input1 = opCodeAndParams.paramMode1 === '1' ? instructions[i+1] : instructions[instructions[i+1]]
    let input2 = opCodeAndParams.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]

    if (input1 !== 0) {
      return input2
    } else {
      return i + 3
    }
  }

  if (opCodeAndParams.opCode === '06') {
    let input1 = opCodeAndParams.paramMode1 === '1' ? instructions[i+1] : instructions[instructions[i+1]]
    let input2 = opCodeAndParams.paramMode2 === '1' ? instructions[i+2] : instructions[instructions[i+2]]

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

console.log(amplifierController())
