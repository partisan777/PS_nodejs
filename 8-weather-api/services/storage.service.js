import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';



const SETTINS_FILE_NAME = 'weather-data.json';
const filePath = join(homedir(), SETTINS_FILE_NAME);


const getStorage = async () => {
	let data = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}
	return data;
};



const getKeyValue = async (key) => {
	let data = await getStorage();
	if (data[key]) {
		return data[key];		
	};
	
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
	const oldData = await getStorage();
	const data = Object.assign(oldData, newData);
	await promises.writeFile(filePath, JSON.stringify(data));
};


export { getKeyValue, getStorage, saveStorage };
