
const LANGUAGE_WEATHER_PACK = {
	ru: {
		weather: 'Погода в городе',
		temperature: 'Температура',
		feelsLike: 'ощущается как',
		humidity: 'Влажность',
		windSpeed: 'Скорость ветра'
	},
	en: {	
		weather: 'Weather in the city',
		temperature: 'Temperature',
		feelsLike: 'feels like',
		humidity: 'Humidity',
		windSpeed: 'Wind speed'
	}	
};

const LANGUAGE_LOG_HELP_PACK = {
	ru: {
		descrSetting: 'Без параметров - вывод погоды',
		citySetting: 'для установки города',
		helpSetting: 'для вывода помощи',
		tokenSetting: 'для сохранения токена',
		langSetting: `для установки языка. Доступные варинаты ('en' и 'ru')`,
		showSetting: 'для вывода настроек'	
	},
	en: {
		descrSetting: 'Without parameters - weather output',
		citySetting: 'for setting the city',
		helpSetting: 'to withdraw aid',
		tokenSetting: 'to save the token',
		langSetting: `to install the language. Available options ('en' и 'ru')`,
		showSetting: 'to display settings'
	}
};		
		
const LANGUAGE_LOG_PACK = {
	ru: {
		tokenNotTransf: 'Не передан token',
		tokenSaved: 'Токен сохранён',
		cityNotTranf: 'Не передан город',
		citySaved: 'Город сохранён',
		langNotTranf: 'Не передан язык',
		incorrectLanguage: 'Неверно указан язык',
		langSaved: 'Язык сохранён',
		cityIncorrect: 'Неверно указан город',
		tokenIncorrect: 'Неверно указан токен'
	},
	en: {
		tokenNotTrans: 'Token not transferred',
		tokenSaved: 'Token saved',
		cityNotTranf: 'City not transferred',
		citySaved: 'City saved',
		langNotTranf:  'Language not transferred',
		incorrectLanguage: 'Incorrect language',
		langSaved: 'Language saved',
		cityIncorrect: 'The city is incorrect',
		tokenIncorrect: 'Incorrect token specified'
	}
};

const LANGUAGE_SHOW_SETTINGS_PACK = {
	ru: {
		token: 'Токен',
		city: 'Город',
		lang: 'Язык',
		notFound: '<Не определено>'
	},
	en: {
		token: 'Token',
		city: 'City',
		lang: 'Language',
		notFound: '< undefined >'
	}
};

const LANGUAGE_API_PACK = {
	ru: {
		notSetApiKey: 'Не задан ключ API, задайте его через команду'
	},
	en: {
		notSetApiKey: 'The API key is not set, set it via the command'
	}
};

export { LANGUAGE_WEATHER_PACK, LANGUAGE_LOG_HELP_PACK, LANGUAGE_LOG_PACK, LANGUAGE_SHOW_SETTINGS_PACK, LANGUAGE_API_PACK };
