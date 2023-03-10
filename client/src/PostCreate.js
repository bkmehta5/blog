import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
	const [title, setTitle] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		await axios.post('http://posts.com/posts/create', {
			title,
		});

		setTitle('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="">Title</label>
					<input
						value={title}
						className="form-control"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}
