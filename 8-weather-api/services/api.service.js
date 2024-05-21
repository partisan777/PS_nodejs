import axios from 'axios';
import { LANGUAGE_API_PACK } from '../dictionares/language-packs.js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};





const getWeather = async (city, token, lang, units) => {
	const { notSetApiKey } = LANGUAGE_API_PACK[lang];
	if (!token) {
		throw new Error(`${notSetApiKey} -t [API_KEY]`);
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: lang,
			units: units
		}
	});
	return data;
};

export { getWeather, getIcon };
