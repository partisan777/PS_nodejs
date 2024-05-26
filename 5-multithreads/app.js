const os = require('node:os'); 
const chunk = require('./chunk');
const { Worker } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks');

const COUNT_NUMS = 300000;
const CPU_CORES = os.cpus().length/2; // делим на 2 - отсекаем Hyper-threading
const DELIMETR = 3;

let array = Array.from({ length: COUNT_NUMS }, (v, k) => k);


const performanceObserver = new PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});

performanceObserver.observe({ entryTypes: ['measure'] });


const workerDelimArr = (arr, delim, workerMsg) => {
	return new Promise((resolve, reject) => {
		performance.mark(`worker start ${workerMsg}`);
		const worker = new Worker('./worker', {
			workerData: {
				arr: arr,
                delim: delim
			}
		});
		worker.on('message', (msg) => {
            console.log(`Кол-во искомых чисел (${workerMsg}): ${msg}`)
			performance.mark(`worker end ${workerMsg}`);
			performance.measure(`worker ${workerMsg}`, `worker start ${workerMsg}`, `worker end ${workerMsg}`);
			resolve(msg);
		});
	});
};



const workerDelimArrChunk = async (arr, delim, workerMsg) => {
	performance.mark(`worker start ${workerMsg}`);
    const arrayChunk = chunk(arr, arr.length/CPU_CORES);
    const result = await Promise.all(
        arrayChunk.map( (item, idx) => {
            return workerDelimArr(item, delim, `${workerMsg} ${idx}`)
        })
	);
	const sumResult = result.reduce(function(sum, elem) {
        return sum + elem;
    }, 0);
    console.log(`Кол-во искомых чисел (${workerMsg}): ${sumResult}`)
	performance.mark(`worker end ${workerMsg}`);
	performance.measure(`worker ${workerMsg}`, `worker start ${workerMsg}`, `worker end ${workerMsg}`);
};


//тут по идее надо причесать вывод информации
workerDelimArr(array, DELIMETR, 'arr full');
workerDelimArrChunk(array, DELIMETR, 'arr chunk');
