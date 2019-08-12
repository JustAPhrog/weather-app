const request = require('request');

const weather = (lat, lng, callback) => {
	const key = process.env.WEATHERAPI;
	const weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=si&exclude=[minutely,hourly,alerts,flags]`;
	request({url: weatherUrl, json: true}, (err, { body }) => {
		if (err) {
			callback(err, undefined);
		} else if(body.currently === undefined) {
			callback('No data found', undefined);
		} else {
			const currently = body.currently;
			const weatherData = {
				currently: currently,
				message: body.daily.data[0].summary + ' It is currently ' 
					+ currently.temperature 
					+ ' °C (fells like ' + currently.apparentTemperature
					+ ' °C). There is ' + currently.precipProbability * 100
					+ '% to ' + ( currently.precipType === undefined ? 'rainfall' : currently.precipType )
					+ '. Pressure is ' + currently.pressure + ' hPa.'
			};
			callback(undefined, weatherData);
		}
	});
};

module.exports = weather;