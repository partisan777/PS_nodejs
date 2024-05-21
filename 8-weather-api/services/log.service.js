import dedent from 'dedent-js';
import { LANGUAGE_WEATHER_PACK, LANGUAGE_SHOW_SETTINGS_PACK } from '../dictionares/language-packs.js';
import { TOKEN_DICTIONARY } from '../dictionares/dictionaries.js';

const prepareError = (error) => {
	return (' ERROR ' + ' ' + error);
};

const printSuccess = (message) => {
	return (' SUCCESS ' + ' ' + message);
};
		
const prepareWeather = (res, icon, language) => {
	const { weather, temperature, feelsLike, humidity, windSpeed } = LANGUAGE_WEATHER_PACK[language];
		
	return (dedent` WEATHER  ${weather} ${res.name}
	${icon} ${temperature}: ${res.main.temp} (${feelsLike} ${res.main.feels_like})
	${humidity}: ${res.main.humidity}%
	${windSpeed}: ${res.wind.speed}`);
};

const prepareSetting = async (storageData, language) => {
	const {token, city, lang, notFound } = LANGUAGE_SHOW_SETTINGS_PACK[language];
	return(
		dedent` Current settings 
		${token}: ${storageData[TOKEN_DICTIONARY.token] ?? notFound}
		${city}: ${storageData[TOKEN_DICTIONARY.city].join(',') ?? notFound}
		${lang}: ${storageData[TOKEN_DICTIONARY.lang] ?? notFound}
		`
	);
	
};

export { prepareError, printSuccess, prepareWeather, prepareSetting };
