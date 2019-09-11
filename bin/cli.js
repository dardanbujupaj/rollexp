#!/usr/bin/env node

const rollexp = require('../src/index.js');

const [,, ...args] = process.argv;

let verbose = false;

if (args.includes('--v')) {
  args.splice(args.findIndex((a) => a === '--v'));
  verbose = true;
}

const expression = args.join(' ');


const {result, explanation} = rollexp.evaluateExpression(expression);

if (verbose) {
  console.log(explanation + ' => ' + result);
} else {
  console.log(result);
}
