const add = require('./functions/add');
const division = require('./functions/division');
const multiplication = require('./functions/multiplication');
const subtraction = require('./functions/subtraction');

const opeartions = {
    "+": add,
    "/": division,
    '*': multiplication,
    "-": subtraction
};

const regexp = /^\d{1,10} \d{1,10} [\+, \-, \/, \*]{1}$/g;

const firstVal  = process.argv[2];
const secondVal = process.argv[3];
const thirdVal  = process.argv[4].replace('functions', '*'); //при передаче * приходит значение functions как санитайзить значения пока не зачем

const input = [firstVal, secondVal, thirdVal].join(' ');

if (!regexp.test(input)) {
    console.log('введены неверные данные.');
    return;
} else {

    const firstNum  = parseInt(firstVal);
    const secondNum = parseInt(secondVal);
    const operation = thirdVal;

    console.log(opeartions[operation](firstNum, secondNum));
};
