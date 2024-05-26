import express from 'express';
import { weatherRouter } from './routes/weather.router';
import { settingsRouter } from './routes/settings.router';
import  bodyParser from 'body-parser';

const port = 8000;
const app = express();

app.use( bodyParser() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/weather', weatherRouter);
app.use('/settings', settingsRouter);

app.get('/', (req, res) => {
    res.send('OK!');
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
