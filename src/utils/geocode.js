const request = require('request');

const geocode = (address, callback) => {
	const key = process.env.GEOCODEAPI;
	address = encodeURIComponent(address);
	const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}`;
	
	request({url: geocodeUrl, json: true}, (err, { body }) => {
		//console.log(JSON.stringify(body, undefined, 4));
		if(err){
			callback(err, undefined);
		} else if(body.features.length  === 0) {
			callback('Wrong address!', undefined);
		} else {
			const locations = body.features[0];
			const data = {
				lat: locations.center[1],
				lng: locations.center[0],
				location: locations.place_name,
				url: geocodeUrl
			};
			callback(undefined, data);
		}
	});
};

module.exports = geocode;