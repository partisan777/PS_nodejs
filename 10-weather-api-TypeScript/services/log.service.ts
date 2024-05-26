import dedent from 'dedent-js';
import { LANGUAGE_WEATHER_PACK, LANGUAGE_SHOW_SETTINGS_PACK } from '../dictionares/language-packs';
import { TOKEN_DICTIONARY } from '../dictionares/dictionaries';
import { Settings, Language, WeatherResponse, KeyTokenDictionary } from '../types/types';

const prepareError = (error: string) => {
	return (' ERROR ' + ' ' + error);
};

const printSuccess = (message: string) => {
	return (' SUCCESS ' + ' ' + message);
};
		
const prepareWeather = (res: WeatherResponse, icon: any, language: Language): String=> {
	
	const { weather, temperature, feelsLike, humidity, windSpeed } = LANGUAGE_WEATHER_PACK[language];
		
	return (
		dedent` WEATHER  ${weather} ${res.name}
		${icon} ${temperature}: ${res.main.temp} (${feelsLike} ${res.main.feels_like})
		${humidity}: ${res.main.humidity}%
		${windSpeed}: ${res.wind.speed}`
	);
};

const prepareSetting = async (storageData: Settings, language: Language): Promise<String> => {
	const {token, city, lang, notFound } = LANGUAGE_SHOW_SETTINGS_PACK[language];
	const token_data = storageData[TOKEN_DICTIONARY.token as KeyTokenDictionary]
	let city_data: string | undefined = undefined;
	const city_data_temp = storageData[TOKEN_DICTIONARY.city as KeyTokenDictionary]; 
	if (Array.isArray(city_data_temp)) {
		city_data = city_data_temp.join(',');		
	};
	
	const lang_data = storageData[TOKEN_DICTIONARY.lang as KeyTokenDictionary]
	return(
		dedent` Current settings 
		${token}: ${token_data ?? notFound}
		${city}: ${city_data ?? notFound}		
		${lang}: ${lang_data ?? notFound}
		`
	);	
};

export { prepareError, printSuccess, prepareWeather, prepareSetting };
