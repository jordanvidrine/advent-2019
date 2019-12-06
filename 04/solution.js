const RangeStart = 123257
const RangeEnd = 647015

// password requirements
// six digits
// within range
// Two adjacent digits are the same (like 22 in 122345)
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or
// 135679).

// examples
// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).



function howManyDiffPasswords(start, end) {
  let passwords = 0
  for (let i = start; i !== end; i++) {
    if(isGoodPassword(i, start, end)) {
      passwords++
    }
  }
  return passwords
}

function isGoodPassword(number, start, end) {
  if (
      number.toString().length === 6
      && number >= start && number <= end
      // && twoAdjacentDigits(number)
      && butNotBiggerThanTwo(number)
      && digitsNeverDecrease(number)
     ) return true
  return false;
}

function twoAdjacentDigits(number) {
  let splitStr = number.toString().split('')
  return splitStr.some((number, idx) => {
    return (
      number === splitStr[idx+1]
    )
  })
}

function butNotBiggerThanTwo(number) {
  let capturedNumbers = {}

  number = number.toString().split('')

  number.forEach((digit) => {
    if (!(digit in capturedNumbers)) {
      capturedNumbers[digit] = 1
    } else {
      capturedNumbers[digit]++
    }
  })

  for (let key in capturedNumbers) {
    if (capturedNumbers[key] === 2) return true
  }

  return false;
}

function digitsNeverDecrease(number) {
  let splitStr = number.toString().split('')
  return splitStr.every((number, idx) => {
    if (idx == 0) return true;
    return (
      Number(number) >= Number(splitStr[idx-1])
    )
  })
}

console.log(howManyDiffPasswords(RangeStart,RangeEnd))
// console.log(butNotBiggerThanTwo(1111222))
