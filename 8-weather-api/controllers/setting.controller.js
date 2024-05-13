import { getLanguage } from './language.controller.js';
import { prepareSetting } from "../services/log.service.js";
import { getStortage, saveStorage } from "../services/storage.service.js";

const currentSettings =  async() => {
    const language = await getLanguage();
    const store = await getStortage();
    const result = await prepareSetting(store, language);
    return result;
};


const updateSettings =  async (newSetting) => {
    await saveStorage(newSetting);
    return 'Данные сохранены';
};


export { currentSettings, updateSettings};
