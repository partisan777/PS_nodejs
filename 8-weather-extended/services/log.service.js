import chalk from 'chalk';
import dedent from 'dedent-js';
import { LANGUAGE_WEATHER_PACK, LANGUAGE_SHOW_SETTINGS_PACK, LANGUAGE_LOG_HELP_PACK, TOKEN_DICTIONARY } from '../dictionares/dictionares.js';


const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = (language) => {
	const { descrSetting, citySetting, helpSetting, tokenSetting, langSetting, showSetting } = LANGUAGE_LOG_HELP_PACK[language]
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		${descrSetting}
		-c [CITY] ${citySetting}
		-h ${helpSetting}
		-t [API_KEY] ${tokenSetting}
		-l [LANG] ${langSetting}
		-s ${showSetting}
		`
	);
};
		
const printWeather = (res, icon, language) => {
	const { weather, temperature, feelsLike, humidity, windSpeed } = LANGUAGE_WEATHER_PACK[language];
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} ${weather} ${res.name}
		${icon}  ${res.weather[0].description}
		${temperature}: ${res.main.temp} (${feelsLike} ${res.main.feels_like})
		${humidity}: ${res.main.humidity}%
		${windSpeed}: ${res.wind.speed}
		`
	);
};

const showSetting = async (storageData, language) => {
	const {token, city, lang, notFound } = LANGUAGE_SHOW_SETTINGS_PACK[language];
	console.log(
		dedent`${chalk.bgCyan(' Current settings ')}
		${token}: ${storageData[TOKEN_DICTIONARY.token] ?? notFound}
		${city}: ${storageData[TOKEN_DICTIONARY.city] ?? notFound}
		${lang}: ${storageData[TOKEN_DICTIONARY.lang] ?? notFound}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather, showSetting };
