#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather, showSetting } from './services/log.service.js';
import { saveKeyValue, getKeyValue, getStortage } from './services/storage.service.js';
import { LANGUAGE_LOG_PACK, TOKEN_DICTIONARY } from './dictionares/dictionares.js';


//35d7bc54a5e17383c4e9df5b73a2fb6a
// определяем язык. если не определен ставим английский
const language = await getKeyValue(TOKEN_DICTIONARY.lang) ?? 'en';		
// const language = 'en';		

const { tokenNotTransf, tokenSaved, cityNotTranf, citySaved, langNotTranf, incorrectLanguage, langSaved, cityIncorrect, tokenIncorrect } = LANGUAGE_LOG_PACK[language];


const saveToken = async (token) => {
	if (!token.length) {
		printError(tokenNotTransf);
		return;
	};
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess(tokenSaved);
	} catch (e) {
		printError(e.message);
	};
}

const saveCity = async (city) => {
	if (!city.length) {
		printError(cityNotTranf);
		return;
	};
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess(citySaved);
	} catch (e) {
		printError(e.message);
	};
};

const saveLanguage = async (lang) => {
	if (!lang.length) {
		printError(langNotTranf);
		return;
	};
	if (!LANGUAGE_LOG_PACK[lang]) {
		printError(incorrectLanguage);
		return;
	};
	try {
		await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
		printSuccess(langSaved);
	} catch (e) {
		printError(e.message);
	};
};

const getForcast = async () => {
	try {		
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
		const units = 'metric';
		const weather = await getWeather(city, token, language, units);
		printWeather(weather, getIcon(weather.weather[0].icon), language);
	} catch (e) {
		if (e?.response?.status == 404) {
			printError(cityIncorrect);
		} else if (e?.response?.status == 401) {
			printError(tokenIncorrect);
		} else {
			printError(e.message);
		}
	}
};

const initCLI = async () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp(language);
	}
	if (args.c) {
		return saveCity(args.c);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	if (args.l) {
		return saveLanguage(args.l);
	}
	if (args.s) {
		let storageData = await getStortage();
		return showSetting(storageData, language);
	}
	return getForcast();
};

initCLI();