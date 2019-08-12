const path = require('path');
const express = require('express');
const hbs = require('hbs');

require('dotenv').config();
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const port = process.env.PORT || '3000';
const app = express();
const author = 'Phrog'

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static files
app.use(express.static(publicDirPath));	

app.get('/', (req, res) => {
	res.render('index', {
		'title': 'Weather app',
		'message': 'Get forcast by typing location below!',
		'name': author
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		'title': 'About app',
		'message': 'This app show forecast based on location you type.\nIt was made for education purpose.',
		'name': author
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if(!address) {
		return res.send({
			error: 'Address must be provided!'
		})
	}

	geocode(address, (err, {lat, lng, location, url} = {}) => {
		if(err) {
			return res.send({
				error: err,
				address
			});
		}

		weather(lat, lng, (err, weatherData) => {
			if (err) {
				return res.send({
					error: 'Cannot get forcast',
					lat: lat,
					lng: lng
				});
			}

			res.send({
				currently: weatherData.currently,
				weatherMessage: weatherData.message,
				lat: lat,
				lng: lng,
				location,
				url
			})
		})
	})
});

app.get('*', (req, res) => {
	res.render('404', {
		'title': 'Not found page',
		'name': author
	})
});

app.listen(port, () => {
	console.log('Server is up on localhost:', port);
})