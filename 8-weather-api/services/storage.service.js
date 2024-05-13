import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';



const SETTINS_FILE_NAME = 'weather-data.json';
const filePath = join(homedir(), SETTINS_FILE_NAME);


const getStortage = async () => {
	let data = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}
	return data;
};



const getKeyValue = async (key) => {
	let data = await getStortage();
	if (data[key]) {
		return data[key];		
	}
	return undefined;
};

const isExist = async (path) => {
	try {
		await promises.stat(path);
		if ((await promises.stat(path)).size === 0) {
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
};

const saveStorage = async (newData) => {
	let oldData = await getStortage();
	const data = Object.assign(oldData, newData);
	await promises.writeFile(filePath, JSON.stringify(data));
};


export { getKeyValue, getStortage, saveStorage };
