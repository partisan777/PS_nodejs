import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { KeySettings, Settings } from '../types/types';
import { Path } from '../types/types';

const SETTINS_FILE_NAME = 'weather-data.json';
const filePath = join(homedir(), SETTINS_FILE_NAME);

const getStorage = async (): Promise<Settings> => {
	let data = {};
	if (await isExist(filePath)) {
		const file = (await promises.readFile(filePath)).toString();
		data = JSON.parse(file);
	}
	return data;
};

const getKeyValue = async (key: KeySettings): Promise<any> => {
	let data = await getStorage();
	if (data[key]) {
		return data[key];		
	};
	
};

const isExist = async (path: Path) => {
	
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

const saveStorage = async (newData: Settings): Promise<void> => {
	const oldData = await getStorage();
	const data = Object.assign(oldData, newData);
	await promises.writeFile(filePath, JSON.stringify(data));
};


export { getKeyValue, getStorage, saveStorage };
