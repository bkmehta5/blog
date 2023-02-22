const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content, status: 'pending' });

	commentsByPostId[req.params.id] = comments;

	await axios.post('http://event-bus-srv:4005/events', {
		type: 'CommentCreated',
		data: {
			id: commentId,
			content,
			postId: req.params.id,
			status: 'pending',
		},
	});

	res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
	console.log('Receive Event:', req.body.type);

	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		const { postId, id, status, content } = data;
		comments = commentsByPostId[postId];

		const comment = comments.find((comment) => {
			return comment.id === id;
		});
		comment.status = status;

		await axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentModerated',
			data: {
				id,
				content,
				postId,
				status,
			},
		});
	}

	res.send({});
});

app.listen(4001, () => {
	console.log('listening on 4001');
});
