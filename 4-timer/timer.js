const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Для запуска таймера введите желаемый периол в формате XXh XXm XXs: `, time => {
    //тут нужен санитайзинг введенного значения
    // 00h 01m 01s
    // 01h 01m 01s
    // 01h 02m 03s
    let arr = time.split(' ');
    let resultTime_ms = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase().includes('h')) {
            resultTime_ms = resultTime_ms + +arr[i].toLowerCase().replace('h', '') * 3600000;
        }
        if (arr[i].toLowerCase().includes('m')) {
            resultTime_ms = resultTime_ms + +arr[i].toLowerCase().replace('m', '') * 60000;
        }
        if (arr[i].toLowerCase().includes('s')) {
            resultTime_ms = resultTime_ms + +arr[i].toLowerCase().replace('s', '') * 1000;
        };
    };
    
    let currentDate = new Date();
    console.log(`Ваш таймер запустился в ${currentDate} и завершится через  ${time}!`);
    
    setTimeout(() => {
        console.log(`Таймер выполнился`);
    }, resultTime_ms);
    rl.close();
});
