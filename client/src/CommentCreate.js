import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }) {
	const [content, setContent] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();

		await axios.post(`http://posts.com/posts/${postId}/comments`, {
			content,
		});

		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="">New Comment</label>
					<input
						value={content}
						className="form-control"
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}
