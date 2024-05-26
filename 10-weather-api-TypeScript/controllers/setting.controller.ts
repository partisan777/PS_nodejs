import { getLanguage } from './language.controller';
import { prepareSetting } from "../services/log.service";
import { getStorage, saveStorage } from "../services/storage.service";
import { Settings } from '../types/types';

const currentSettings = async() => {
    const language = await getLanguage();
    const store = await getStorage();
    const result = await prepareSetting(store, language);
    return result;
};

const updateSettings =  async (newSetting: Settings) => {
    await saveStorage(newSetting);
    return 'Данные сохранены';
};

export { currentSettings, updateSettings};
