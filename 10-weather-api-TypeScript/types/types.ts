export type Settings = {
    city?: String[],
    token?: String,
    lang?: String,
};

export type KeySettings = keyof Settings;

export type TokenDictionary = {
  city: 'city',
  token: 'token',
  lang: 'lang',
};



export type KeyTokenDictionary = keyof TokenDictionary;

export type Path = string | Buffer | URL;

export type Language = 'ru' | 'en';

export type WeatherResponse = {
    coord: { 
        lon: number,
        lat: number },
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    base: string,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number
    },
    visibility: number,
    wind: { 
        speed: number,
        deg: number,
        gust: number 
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
      type: number,
      id: number,
      country: string,
      sunrise: number,
      sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
};
  

