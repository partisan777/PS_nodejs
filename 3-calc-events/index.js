const EventEmitter = require("events");
const add = require('./functions/add');
const division = require('./functions/division');
const multiplication = require('./functions/multiplication');
const subtraction = require('./functions/subtraction');

const firstNum  = +process.argv[2];
const secondNum = +process.argv[3];
const operation =  process.argv[4].replace('index.js', '*'); //при передаче * приходит значение functions как санитайзить значения пока не зачем


const calcEmitter = new EventEmitter();

const opeartions = {
    "+": add,
    "/": division,
    '*': multiplication,
    "-": subtraction
};

calcEmitter.on('result', (data) => {
    console.log(data);
});

calcEmitter.emit('result', opeartions[operation](firstNum, secondNum));

