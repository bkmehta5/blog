const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		console.log(data);
		const status = data.content.includes('orange') ? 'rejected' : 'approved';
		console.log(status);

		await axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				content: data.content,
				postId: data.postId,
				status,
			},
		});
	}
	res.send({});
});

app.listen(4003, () => {
	console.log('listening on 4003');
});
