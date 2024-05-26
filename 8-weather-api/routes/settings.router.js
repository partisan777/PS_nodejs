import express from 'express';
import { currentSettings, updateSettings } from '../controllers/setting.controller.js';
const settingsRouter = express.Router();

settingsRouter.get('/', async (req, res) => {
	const result = await currentSettings();
	res.send(result);
});

settingsRouter.post('/', async (req, res) => {
	const result = await updateSettings(req.body);
	res.send(result);
});

export { settingsRouter };
