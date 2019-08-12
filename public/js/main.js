console.log('Hello there!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const dataMessage = document.querySelector('#data-text');
const errorMessage = document.querySelector('#error-text');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	dataMessage.textContent = 'Loading...';
	errorMessage.textContent = '';
	const location = search.value;

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if(data.error) {
				dataMessage.textContent = '';
				errorMessage.textContent = data.error;
			} else {
				dataMessage.textContent = data.weatherMessage;
				errorMessage.textContent = data.location;
				//console.log(data.url);
			}
		})
	})

	//console.log(location);
})