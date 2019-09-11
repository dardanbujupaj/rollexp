/**
* Class representing the result of rolled dice
*/
class DiceResult {
  /**
   * @constructor
   *
   * @param {number} result - the resulting number value
   * @param {string} explanation - represents the rolled dice
   */
  constructor(result, explanation) {
    this.result = result || 0;
    this.explanation = explanation || '';
  }
}

const expressionRegex = /(\d*[d]\d+)(h\d+)?(l\d+)?|[+-]|\d+/g;

/**
* Evaluate a dice expression consisting of multiple dice terms
*
* @param {string} expression - a valid dice expression
*
* @return {DiceResult} - the result of the dice rolls
*/
function evaluateExpression(expression = '1d20 + 5') {
  // get array of terms and operators
  const parts = expression.match(expressionRegex);

  // TODO check parts if combination is valid

  let totalResult = 0;
  let totalExplanation = '';

  // first term is added if not preceeded by '-'
  let operation = '+';

  // process each part of the expression
  parts.forEach((part) => {
    let partResult = 0;

    if (part === '+') {
      operation = '+';
      totalExplanation += ' + ';
    } else if (part === '-') {
      operation = '-';
      totalExplanation += ' - ';
    } else if (isNaN(part)) {
      // evaluate dice term
      const {result, explanation} = evaluateTerm(part);
      partResult = result;
      totalExplanation += explanation;
    } else {
      // parse constant integer
      partResult = Number.parseInt(part);
      totalExplanation += part;
    }

    // if last operator was '-' subtract, else add
    if (operation === '-') {
      totalResult -= partResult;
    } else {
      totalResult += partResult;
    }
  });


  return new DiceResult(totalResult, totalExplanation);
}


/**
* get a random number from 1 to {size}
*
* @param {number} size - max value of the random number
*
* @return {number} random number from 1 to {size}
*/
function random(size) {
  return Math.floor(Math.random() * size) + 1;
}


const termRegex = /(\d+)?([d])(\d+)(?:([hl])(\d+))?/;

/**
* evaluate a single dice term
*
* @param {string} term - a valid dice term
*
* @return {DiceResult} result of the term evaluation
*/
function evaluateTerm(term = 'd20') {
  const [
    ,
    diceCount = 1,
    type,
    size,
    hl,
    hlCount = 1,
  ] = term.match(termRegex);

  let rolls = [];

  for (let i = 0; i < diceCount; i++) {
    if (type === 'd') {
      rolls.push(random(size));
    }
  }

  // TODO unsorted result rolls
  if (hl === 'h') {
    rolls = rolls.sort((a, b) => a > b ? 1 : -1)
        .slice(rolls.length - hlCount, rolls.length);
  } else if (hl === 'l') {
    rolls = rolls.sort((a, b) => a > b ? 1 : -1)
        .slice(0, hlCount);
  }


  result = rolls.reduce((a, b) => a + b, 0);
  const explanation = result + ' [' + term + ' -> ' + rolls + ']';

  return new DiceResult(result, explanation);
}

module.exports = {
  evaluateTerm: evaluateTerm,
  evaluateExpression: evaluateExpression,
  DiceResult: DiceResult,
};
