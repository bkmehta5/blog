import React from 'react';

export default function CommentList({ comments }) {
	const renderedComment = comments.map((comment) => {
		let content;

		if (comment.status === 'approved') {
			content = comment.content;
		}
		if (comment.status === 'pending') {
			content = 'This comment is awaiting for moderation';
		}
		if (comment.status === 'rejected') {
			content = 'This comment is rejected';
		}

		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComment}</ul>;
}
