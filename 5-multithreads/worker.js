const { parentPort, workerData } = require('worker_threads');
const divisionwithoutRemainderCount = require('./divisionwithoutRemainderCount');

parentPort.postMessage(divisionwithoutRemainderCount(workerData));
