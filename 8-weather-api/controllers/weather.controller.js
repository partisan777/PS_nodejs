#!/usr/bin/env node
import { getWeather, getIcon } from '../services/api.service.js';
import { prepareError, prepareWeather } from '../services/log.service.js';
import { getKeyValue } from '../services/storage.service.js';
import { LANGUAGE_LOG_PACK } from '../dictionares/language-packs.js';
import { getLanguage } from './language.controller.js';
import { TOKEN_DICTIONARY } from '../dictionares/dictionaries.js';


const getForcast = async () => {	
	const language = await getLanguage();
	
	const { cityIncorrect, tokenIncorrect } = LANGUAGE_LOG_PACK[language];

	try {		
		const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
		const units = 'metric';
		let result = []
		for (let i = 0; cities.length > i; i++ ) {
			const weather = await getWeather(cities[i], token, language, units);
			const res = prepareWeather(weather, getIcon(weather.weather[0].icon), language);
			result.push(res);
		}
		return result;
	} catch (e) {
		if (e?.response?.status == 404) {
			return prepareError(cityIncorrect);
		} else if (e?.response?.status == 401) {
			return prepareError(tokenIncorrect);
		} else {
			return prepareError(e.message);
		}
	};
};

export  { getForcast };
