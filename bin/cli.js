#!/usr/bin/env node

const {evaluateExpression} = require('../src/index.js');

const [,, ...args] = process.argv;

let verbose = false;

if (args.includes('--v')) {
  args.splice(args.findIndex((a) => a === '--v'), 1);
  verbose = true;
}

if (args.length === 0) {
  console.log('Usage: roll EXPRESSION')
  console.log('Example: \n %roll d20 + 5\n 25')
  return
}

const expression = args.join(' ');


const {result, explanation} = evaluateExpression(expression);

if (verbose) {
  console.log(explanation + ' => ' + result);
} else {
  console.log(result);
}
