import express from 'express';
import { getForcast } from '../controllers/weather.controller';

const weatherRouter = express.Router();

weatherRouter.get('/', async (req, res) => {
	const result = await getForcast();
	res.send(result);
});

export { weatherRouter };
