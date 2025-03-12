const fs = require('fs');
const path = require('path');

// Load JSON file
const filePath = path.join(__dirname, 'data', 'questions.json');
fs.readFile(filePath, 'utf-8', (err, data) => {
	if (err) {
		console.error('Error reading the JSON file:', err);
		return;
	}
	const questions = JSON.parse(data);
	console.log('Loaded questions:', questions);
});
