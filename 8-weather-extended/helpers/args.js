const getArgs = (args) => {

	const [executer, file, ...rest] = args;
	let arrSettingKeys = [];
	let res = {};
	//собираем ключи
	for (let i = 0; i < rest.length; i++ ) {
		if (rest[i].charAt(0) === '-') {
			arrSettingKeys.push(i);
		};
	};
  
	for (let i = 0; i < arrSettingKeys.length; i++ ) {
		if (rest[arrSettingKeys[i]] === '-c') {
			res[rest[arrSettingKeys[i]].substring(1)] = rest.slice(arrSettingKeys[i]+1, arrSettingKeys[i+1]);
			continue
		} else {
			res[rest[arrSettingKeys[i]].substring(1)] = rest[arrSettingKeys[i]+1] ?? true;
		}
	};
  
  	return res
};

export { getArgs }
