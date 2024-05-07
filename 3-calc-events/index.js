const EventEmitter = require("events");
const firstNum  = +process.argv[2];
const secondNum = +process.argv[3];
const operation =  process.argv[4].replace('index.js', '*'); //при передаче * приходит значение functions как санитайзить значения пока не зачем

/*
    тут по идее надо сделать проверку на введеные значения
*/

const calcEmitter = new EventEmitter();
// console.log(firstNum, secondNum, operation, 0)


calcEmitter.on('result', (data) => {
    console.log(data);
});

calcEmitter.on('+', (firstNum, secondNum) => {
    calcEmitter.emit('result', firstNum + secondNum);
});
calcEmitter.on('-', (firstNum, secondNum) => {
    calcEmitter.emit('result', firstNum - secondNum);
});
calcEmitter.on('*', (firstNum, secondNum) => {
    calcEmitter.emit('result', firstNum * secondNum);
});
calcEmitter.on('/', (firstNum, secondNum) => {
    calcEmitter.emit('result', firstNum / secondNum);
});

calcEmitter.emit(operation, firstNum, secondNum);
    
