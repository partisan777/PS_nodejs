const readline = require('node:readline');
const path = require('path');
const NotificationCenter = require('node-notifier').NotificationCenter;

let notificationCenterNotifier = new NotificationCenter({
  withFallback: true
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Для запуска таймера введите желаемый периол в формате XXh XXm XXs: `, time => {
    //тут нужен санитайзинг введенного значения
    // варианты ввода 
    // 00h 00m 03s
    // 00h 00m 10s
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
        notificationCenterNotifier.notify({
            title: "Notification Center Notifications",
            subtitle: "For macOS > 10.8",
            message: "This is a notification sent using Notification Center",
            sound: 'Frog',
            icon: path.join(__dirname, 'Alarm.jpg'),
            contentImage: path.join(__dirname, 'Alarm.jpg'),
            open: undefined,
            wait: true,
          },
          (error, response, metadata) => {
            
          }
        );
        console.log(`Таймер выполнился`);
    }, resultTime_ms);
    rl.close();
});
