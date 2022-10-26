// * Bitwise
const bit = Number(6).toString(2);
const getBinary = (n) => Number(n).toString(2);
const getDecimal = (n) => parseInt(n, 2);
// const bitwiseAND = (n1, n2) => getBinary(n1) & getBinary(n2);
// const bitwiseOR = (n1, n2) => getBinary(n1) | getBinary(n2);
// const bitwiseXOR = (n1, n2) => getBinary(n1) ^ getBinary(n2);
const bitwiseAND = (n1, n2) => n1 & n2;
const bitwiseOR = (n1, n2) => n1 | n2;
const bitwiseXOR = (n1, n2) => n1 ^ n2;

console.log(
  'ex 1',
  bitwiseAND(6, 23),
  bitwiseOR(6, 23),
  bitwiseXOR(6, 23),
  bitwiseAND(7, 12),
  bitwiseOR(7, 12),
  bitwiseXOR(7, 12)
  // getDecimal(bitwiseAND(7, 12)),
  // getDecimal(bitwiseOR(7, 12)),
  // getDecimal(bitwiseXOR(7, 12)),
  // getBinary(7),
  // getBinary(12),
  // 111 & 1100,
  // 5 | 3
);

// * Left Shift by Powers of Two
const shiftToLeft = (n1, n2) => n1 * 2 ** n2;
console.log(
  'ex 2',
  shiftToLeft(5, 2),
  shiftToLeft(10, 3),
  shiftToLeft(-32, 2),
  shiftToLeft(-6, 5),
  shiftToLeft(12, 4),
  shiftToLeft(46, 6)
);

// * Matchstick Houses
const matchHouses = (step) => {
  if (step === 0) {
    return 0;
  }
  if (step === 1) {
    return 6;
  }
  // TODO
  // TODO understand this
  return matchHouses(step - 1) + 5;

  // ? My solution
  // const matchsticks = 6;
  // if (step > 0) {
  //   return matchsticks + (step - 1) * (matchsticks - 1);
  // }
  // return 0;
};
console.log(
  'ex 3',
  matchHouses(0),
  matchHouses(1),
  matchHouses(4),
  matchHouses(87)
);

// * RegEx XIV: Group Ranges x|y
const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

const regexpNames = /First_Name: (\w+), Last_Name: (\w+)/gm;
for (const match of personList.matchAll(regexpNames)) {
  console.log('ex 4', match, `Hello ${match[1]} ${match[2]}`);
}
let REGEXP = /blue|red/;
console.log(
  'ex 4',
  'red flag'.match(REGEXP), // red
  'blue flag'.match(REGEXP) // blue
);
// REGEXP = /blue flag|red flag/mg;
REGEXP = /(red|blue) flag/g;
console.log(
  'ex 4',
  'red flag blue flag'.match(REGEXP), // ➞ ["red flag", "blue flag"]
  'yellow flag red flag blue flag green flag'.match(REGEXP), // ➞ ["red flag", "blue flag"]
  'pink flag red flag black flag blue flag green flag red flag '.match(REGEXP) // ➞ ["red flag", "blue flag", "red flag"]
);

// * Largest Swap
const largestSwap = (num) => {
  // ? My solution
  // const tens = Math.trunc(num / 10);
  // const units = 10 - (tens * 10 + 10 - num);
  // const swapped = units * 10 + tens;
  // return num >= swapped;

  // ? Shortest solution
  console.log(num, num / 10, num % 10);
  return num / 10 > num % 10;
  // return { num, tens, units, swapped, largest: num >= swapped };
};
console.log(
  'ex 5 \n',
  largestSwap(27),
  '\n', // ➞ false
  largestSwap(43),
  '\n', // ➞ true,
  largestSwap(14),
  '\n', // ➞ false
  largestSwap(53),
  '\n', // ➞ true
  largestSwap(99),
  '\n', // ➞ true
  largestSwap(90),
  '\n', // ➞ false
  largestSwap(10),
  '\n' // ➞ true
);

// * Which Function Returns the Larger Number?
const whichIsLarger = (f, g) => {
  if (f() === g()) {
    return 'neither';
  }
  return f() > g() ? 'f' : 'g';
};
console.log(
  'ex 6',
  whichIsLarger(
    () => 5,
    () => 10
  ), // ➞ "g"

  whichIsLarger(
    () => 25,
    () => 25
  ), // ➞ "neither"

  whichIsLarger(
    () => 505050,
    () => 5050
  ) // ➞ "f"
);

// * Convert a Number to Base-2
function binary (decimal) {
  // const bits = Array(8)
  //   .fill()
  //   .map((_, i) => i + 1)
  //   .sort((a, b) => b - a);
  // console.log(bits);
  // return bits
  //   .reduce((result, bit) => {

  //   }, ``);
  return Number(decimal).toString(2);
}
console.log(
  'ex 7\n',
  binary(1),
  '\n', // ➞ "1"
  // 1*1 = 1
  binary(5),
  '\n', // ➞ "101"
  // 1*1 + 1*4 = 5
  binary(10),
  '\n', // ➞ "1010"
  // 1*2 + 1*8 = 10
  binary(1023)
);

// * What's Hiding Amongst the Crowd?
function detectWord (str) {
  const REGEXP = /[a-z]/g;
  return str.match(REGEXP).join('');
}
console.log(
  'ex 8\n',
  detectWord('UcUNFYGaFYFYGtNUH'),
  '\n', // ➞ "cat"
  detectWord('bEEFGBuFBRrHgUHlNFYaYr'),
  '\n', // ➞ "burglar"
  detectWord('YFemHUFBbezFBYzFBYLleGBYEFGBMENTment'),
  '\n' // ➞ "embezzlement"
);

// * Hex to Binary
function toBinary (num) {
  // const decimal = Number(num).toString(10);
  return Number(num).toString(2);
}
console.log('ex 9', toBinary(0xff), toBinary(0xaa), toBinary(0xfa));

// * Number of Squares in an N * N Grid
// ? My solution
// function numberSquares(n) {
//   // if (n === 0) {
//   //   return 0;
//   // }
//   let squares = 0;
//   for (let index = 1; index <= n; index++) {
//     squares += index ** 2;
//   }
//   return squares;
// }
// ? Shortest solution
const numberSquares = (n) => (n > 1 ? n ** 2 + numberSquares(n - 1) : 1);

console.log(
  'ex 10',
  numberSquares(0),
  numberSquares(2), // ➞ 5
  numberSquares(4), // ➞ 30
  numberSquares(5), // ➞ 55
  numberSquares(3),
  numberSquares(10),
  numberSquares(12),
  numberSquares(5),
  numberSquares(9),
  numberSquares(11),
  numberSquares(15)
);

// * Find the amount of potatoes
function potatoes (str) {
  const REGEXP = /potato/g;
  return str.match(REGEXP).length;
}
console.log(
  'ex 11',
  potatoes('potato'),
  potatoes('potatopotato'),
  potatoes('potatoapple')
);

// Tuck in Array
function tuckIn (arr1, arr2) {
  const [init, end] = arr1;
  return [init, ...arr2, end];
}
console.log(
  'ex 12',
  tuckIn([1, 10], [2, 3, 4, 5, 6, 7, 8, 9]),
  tuckIn([15, 150], [45, 75, 35]),
  tuckIn(
    [
      [1, 2],
      [5, 6],
    ],
    [[3, 4]]
  )
);

// * Is it Time for Milk and Cookies?
function timeForMilkAndCookies (date) {
  return new Date(date).getMonth() === 11;
}
console.log(
  'ex 13',
  timeForMilkAndCookies(new Date(2013, 11, 24)), // ➞ true
  timeForMilkAndCookies(new Date(2013, 0, 23)), // ➞ false
  timeForMilkAndCookies(new Date(3000, 11, 24)) // ➞ true
);

function FirstFactorial (num) {
  return num === 1 ? 1 : num * FirstFactorial(num - 1);
}

// keep this function call here
console.log(FirstFactorial(8));

function FirstReverse (str = '') {
  let reverseString = '';
  for (let i = str.length; i >= 0; i--) {
    reverseString += str.charAt(i);
  }
  return reverseString;
}

// keep this function call here
console.log(FirstReverse('coderbyte'));

function spinWords (string = '') {
  const words = string.split(' ');
  return words
    .map((word) => (word.length >= 5 ? [...word].reverse().join('') : word))
    .join(' ');
}
console.log(
  spinWords('Welcome'),
  spinWords('Hey fellow warriors'),
  spinWords('This is a test'),
  spinWords('This is another test'),
  spinWords('You are almost to the last test'),
  spinWords('Just kidding there is still one more'),
  spinWords('Seriously this is the last one')
);

function narcissistic (value = 0) {
  const digits = value.toString(10).split('');
  const l = digits.length;
  return (
    digits.reduce((calc, digit) => {
      const i = parseInt(digit, 10);
      return calc + i ** l;
    }, 0) === value
  );
}

console.log(
  narcissistic(7),
  narcissistic(371),
  narcissistic(1000),
  narcissistic(153),
  narcissistic(1652)
);

function filter_list (arr = []) {
  return arr.filter((v) => typeof v !== 'string');
}
console.log(
  filter_list([1, 2, 'a', 'b']), // == [1,2]
  filter_list([1, 'a', 'b', 0, 15]), // == [1,0,15]
  filter_list([1, 2, 'aasf', '1', '123', 123]) // == [1,2,123]
);

function getCount (str = '') {
  return str.match(/[aeiou]/g)?.length ?? 0;
}
console.log(
  getCount('abracadabra'),
  getCount('vowels'),
  getCount('authenticjobs'),
  getCount('my pynyx')
);

function sumNumbers (arr = []) {
  let sum = 0;
  for (let index = 0; index < arr.length; index++) {
    sum += arr[index];
  }
  return sum;
}

function findEvenIndex (arr = []) {
  let index = -1;
  for (let i = 0, l = arr.length; i < l; i++) {
    const leftSum = sumNumbers(arr.slice(0, i));
    const rightSum = sumNumbers(arr.slice(i + 1, l));
    if (leftSum === rightSum) {
      index = i;
    }
  }
  return index;
}

console.log(
  findEvenIndex([1, 2, 3, 4, 3, 2, 1]), // 3, "The array was: [1,2,3,4,3,2,1] \n");
  findEvenIndex([1, 100, 50, -51, 1, 1]), // 1, "The array was: [1,100,50,-51,1,1] \n");
  findEvenIndex([1, 2, 3, 4, 5, 6]), // -1, "The array was: [1,2,3,4,5,6] \n");
  findEvenIndex([20, 10, 30, 10, 10, 15, 35]), // 3, "The array was: [20,10,30,10,10,15,35] \n");
  findEvenIndex([1, 2, 3, 4, 3, 2, 1]),
  findEvenIndex([1, 100, 50, -51, 1, 1]),
  findEvenIndex([20, 10, -80, 10, 10, 15, 35])
);

function isPangram (string = '') {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const lowerString = string.toLowerCase();
  return alphabet.every((letter) => lowerString.includes(letter));
  // return (string.match(/([a-z])(?!.*\1)/ig) || []).length === 26;
}
console.log(
  isPangram('The quick brown fox jumps over the lazy dog.'),
  isPangram('This is not a pangram.')
);

function duplicateCount (text = '') {
  // ? My solution
  return [...new Set(text.toLowerCase().match(/([a-z])(?=[a-z]*\1)/gim) ?? [])]
    .length;
  // ? Other guy's solution
  // return (
  //   text
  //     .toLowerCase()
  //     .split('')
  //     .sort()
  //     .join('')
  //     .match(/([^])\1+/g) || []
  // ).length;
  // ? Other guy's solution
  // return new Set(text.toLowerCase().match(/(.)(?=.*\1)/gi)).size;
}
console.log(
  duplicateCount(''), // 0);
  duplicateCount('abcde'), // 0);
  duplicateCount('aabbcde'), // 2);
  duplicateCount('aabBcde'), // 2,"should ignore case");
  duplicateCount('Indivisibility'), // 1)
  duplicateCount('Indivisibilities') // 2, "characters may not be adjacent")
);

function findOdd2 (A = []) {
  return [...new Set(A)].find(
    (n) => (A.filter((n2) => n2 === n).length & 1) !== 0
  );
}
const findOdd = (xs) => xs.reduce((a, b) => a ^ b);

console.log(
  findOdd([20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5]),
  findOdd([1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5]),
  findOdd([20, 1, 1, 2, 2, 3, 3, 5, 5, 4, 20, 4, 5]),
  findOdd([10]),
  findOdd([1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1]),
  findOdd([5, 4, 3, 2, 1, 5, 4, 3, 2, 10, 10])
);

const uniqueInOrder = function (iterable = new Set([])) {
  // your code here - remember iterable can be a string or an array
  const arr = [...iterable];
  return arr.filter((element, index) =>
    index > 0 ? arr[index - 1] !== element : true
  );
};
console.log(
  uniqueInOrder('AAAABBBCCDAABBB'), // == ['A', 'B', 'C', 'D', 'A', 'B']
  uniqueInOrder('ABBCcAD'), // == ['A', 'B', 'C', 'c', 'A', 'D']
  uniqueInOrder([1, 2, 2, 3, 3]) // == [1,2,3]
);

// * My solution
function deleteNth (arr = [0], n = 0) {
  return arr.filter(
    (item, index) =>
      !arr
        .map((deepItem, deepIndex) => ({ deepItem, deepIndex }))
        .filter(({ deepItem }) => deepItem === item)
        .map(({ deepIndex }) => deepIndex)
        .slice(n)
        .includes(index)
  );
}
// ? Other guy's solution
function deleteNth2 (arr = [0], x = 0) {
  const cache = {};
  return arr.filter((n) => {
    cache[n] = (cache[n] || 0) + 1;
    return cache[n] <= x;
  });
}

console.log(
  deleteNth([20, 37, 20, 21], 1),
  '\n',
  deleteNth([1, 1, 3, 3, 7, 2, 2, 2, 2], 3),
  '\n',
  deleteNth([1, 2, 3, 1, 2, 1, 2, 3], 2),
  '\n'
);

// const n = 45;
// let sum = 0;
// for (let index = n; index > 0; index--) {
//   sum += index ** 3;
// }
// console.log(n, sum);

// * My solution
const findNb = (m = 0) => {
  let i = 0;
  let sum = 0;
  while (sum < m) {
    i += 1;
    sum += i ** 3;
  }
  return sum === m ? i : -1;
};
// Someone else's solution
function findNb2 (m = 0) {
  let n = 0;
  while (m > 0) m -= (++n) ** 3;
  return m ? -1 : n;
}
console.log(
  findNb(1071225),
  '\n',
  findNb(91716553919377),
  '\n',
  findNb(4183059834009),
  '\n', // 2022
  findNb(24723578342962),
  '\n', // -1
  findNb(135440716410000),
  '\n', // 4824
  findNb(40539911473216),
  '\n' // 3568
);

function extractNumber (str = '') {
  return Number(str.replace(/\D/g, ''));
}
function order (words = '') {
  if (words === '') {
    return words;
  }
  return words
    .split(' ')
    .sort((a, b) => extractNumber(a) - extractNumber(b))
    .join(' ');
}
console.log(
  order('4of Fo1r pe6ople g3ood th5e the2'),
  '\n',
  order('is2 Thi1s T4est 3a'),
  '\n',
  order('empty inp2ut should return e1mpty string'),
  '\n',
  order(''),
  '\n'
);

// * My solution
function getHex (n = 0) {
  let dec = n;
  if (dec < 0) {
    dec = 0;
  } else if (dec > 255) {
    dec = 255;
  }
  const hex = dec.toString(16).toUpperCase();
  return hex.length > 1 ? hex : `0${hex}`;
}
function rgb2 (r = 0, g = 0, b = 0) {
  return `${getHex(r)}${getHex(g)}${getHex(b)}`;
}

// ? Other people's solution
function toHex (d) {
  if (d < 0) {
    return '00';
  }
  if (d > 255) {
    return 'FF';
  }
  // Slice will return last two characters, may and may not include the 0
  return `0${Number(d).toString(16)}`.slice(-2).toUpperCase();
}
function rgb (r, g, b) {
  return toHex(r) + toHex(g) + toHex(b);
}

console.log(
  '\n',
  rgb(255, 255, 255),
  '\n', // returns FFFFFF
  rgb(255, 255, 300),
  '\n', // returns FFFFFF
  rgb(0, 0, 0),
  '\n', // returns 000000
  rgb(148, 0, 211),
  '\n', // returns 9400D3
  rgb(148, 90, 211),
  '\n',
  rgb(0, 0, 0),
  '\n',
  rgb(0, 0, -20),
  '\n',
  rgb(300, 255, 255),
  '\n',
  rgb(173, 255, 47),
  '\n',
  rgb(33, 95, 4)
);

function moveZeros (arr = [0]) {
  return [
    ...arr.filter((item) => item !== 0),
    ...arr.filter((item) => item === 0),
  ];
}
console.log(
  moveZeros([false, 1, 0, 1, 2, 0, 1, 3, 'a']),
  moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1])
);

function incrementString (strng = '') {
  const [text, ...rest] = strng.split(/(\d)/);
  const numPart = rest.join('');
  const nLength = numPart.length;
  const numericNumPart = Number(numPart) + 1;
  const convertedNumPart = numericNumPart.toString();
  const repeatN = nLength - convertedNumPart.length;
  const result = `${text}${'0'.repeat(
    repeatN > 0 ? repeatN : 0
  )}${convertedNumPart}`;
  return result;
}
console.log(
  incrementString('foobar000'), // "foobar001"
  incrementString('foo'), // "foo1"
  incrementString('foobar001'), // "foobar002"
  incrementString('foobar99'), // "foobar100"
  incrementString('foobar099'), // "foobar100"
  incrementString('') // "1"
);

const calPoints = function (ops) {
  const opsResult = [];
  for (var i = 0; i < ops.length; i++) {
    const curOpt = ops[i];
    const resSize = opsResult.length;

    if (curOpt === '+' && resSize >= 2) {
      opsResult.push(opsResult[resSize - 1] + opsResult[resSize - 2]);
    } else if (curOpt === 'D' && resSize >= 1) {
      opsResult.push(opsResult[resSize - 1] * 2);
    } else if (curOpt === 'C' && resSize >= 1) {
      opsResult.pop();
    } else if (
      curOpt !== ' ' &&
      curOpt !== 'C' &&
      curOpt !== 'D' &&
      curOpt !== '+'
    ) {
      opsResult.push(parseInt(curOpt, 10));
    }
  }
  let result = 0;
  for (var i = 0; i < opsResult.length; i++) {
    result += opsResult[i];
  }
  return result;
};

console.log(
  calPoints('D 7 1 8 9 9 C 9 9 + 9 C'),
  calPoints('5 2 C D +'),
  calPoints('8 + 9 0 + 1 2 + 7 + D + 8 + C + 1')
);

function validBrackets (brackets) {
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  const stack = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];

    switch (bracket) {
      case '(':
      case '[':
      case '{':
        stack.push(bracket);
        break;
      case ')':
      case ']':
      case '}':
        if (stack[stack.length - 1] !== pairs[bracket]) {
          return false;
        }
        stack.pop();
        break;
      default:
        return false;
    }

    console.log({ stack, bracket });
  }

  return !stack.length;
}

console.log(
  validBrackets('[[]]'),
  validBrackets('][]['),
  validBrackets('{[()()]}([{}]){}'),
  validBrackets('{}'),
  validBrackets('{[]}'),
  validBrackets('{{[()]}}'),
  validBrackets('{[[]}')
);

const isValid = (s = '') => {
  const pars = s.split('');
  if (!(pars.length > 0 && pars.length < 105)) {
    return false;
  }
  const parsSize = pars.length;
  let isStringValid = true;
  for (let index = 0; index < parsSize; index++) {
    switch (pars[index]) {
      case '(':
        isStringValid = pars[parsSize - index - 1] === ')';
        break;
      case '[':
        isStringValid = pars[parsSize - index - 1] === ']';
        break;
      case '{':
        isStringValid = pars[parsSize - index - 1] === '}';
        break;
      default:
        break;
    }
  }
  return isStringValid;
};
console.log(
  isValid('{}'),
  isValid('{[]}'),
  isValid('{{[()]}}'),
  isValid('{[[]}')
);

/**
 *
 * HACKER RANK
 */
function vowelsAndConsonants (s = '') {
  const vowelRegex = /[aeiou]/g;
  s.match(vowelRegex).forEach((vowel) => {
    console.log(vowel);
  });
  s.replace(vowelRegex, '')
    .match(/[a-z]/g)
    .forEach((cons) => {
      console.log(cons);
    });
}

// vowelsAndConsonants('UcUNFYGaFYFYGtNUH');
// vowelsAndConsonants('bEEFGBuFBRrHgUHlNFYaYr');
// vowelsAndConsonants('YFemHUFBbezFBYzFBYLleGBYEFGBMENTment');
vowelsAndConsonants('javascriptloops');

// Regex to check a string starts and ends with same vowel
const re = /^([aeiou]).+\1$/i;

/**
 * TURING Test
 * ! Not approved
 */
function digitsSomething (digits = '', num = '') {
  const digitsMap = digits
    .split('')
    .reduce(
      (previous, current, index) => ({ ...previous, [current]: index }),
      {}
    );
  const numArr = num.split('');
  let output = 0;
  for (let i = 0, l = numArr.length; i < l; i++) {
    const element = numArr[i];
    if (i > 0) {
      const previousElement = numArr[i - 1];
      output += Math.abs(digitsMap[element] - digitsMap[previousElement]);
      console.log(
        digitsMap[element],
        digitsMap[previousElement],
        digitsMap[element] - digitsMap[previousElement]
      );
    } else {
      output += digitsMap[element];
      console.log('digitsMap[element]', digitsMap[element]);
    }
    console.log({ element, numArr, digitsMap, output });
  }

  return output;
}

digitsSomething('0123456789', '210');
// digitsSomething('8163452709', '897');
