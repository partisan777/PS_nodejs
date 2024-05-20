const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MICROSECONDS = {
    h: 3_600_000,
    m: 60_000,
    s: 1_000
};

rl.question(`Для запуска таймера введите желаемый периол в формате XXh XXm XXs: `, time => {
    
    const regexp = /^\d\d[h, H] \d\d[m, M] \d\d[s,S]$/;
    
    if (!regexp.test(time)) {
        console.log('введен неверный формат даты');
        rl.close();
        return;
    };
    
    const arr = time.split(' ');
    
    const resultTime = arr.reduce(function (sum, item) {
        const discharge = item[item.length - 1].toLowerCase(); 
        const num = parseInt( item.replace(discharge, '') );
        return sum + num * MICROSECONDS[discharge];
    }, 0);
    
    let currentDate = new Date();
    console.log(`Ваш таймер запустился в ${currentDate} и завершится через  ${time}!`);
    
    setTimeout(() => {
        console.log(`Таймер выполнился`);
    }, resultTime);
    rl.close();
});
