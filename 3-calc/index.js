const add = require('./functions/add');
const division = require('./functions/division');
const multiplication = require('./functions/multiplication');
const subtraction = require('./functions/subtraction');

const firstNum  = +process.argv[2];
const secondNum = +process.argv[3];
const operation =  process.argv[4].replace('functions', '*'); //при передаче * приходит значение functions как санитайзить значения пока нет не зачем

/*
    тут по идее надо сделать проверку на введеные значения
*/

const opeartions = {
    "+": add,
    "/": division,
    '*': multiplication,
    "-": subtraction
};

console.log(opeartions[operation](firstNum, secondNum));
