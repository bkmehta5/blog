import React, { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
	const [posts, setPosts] = useState({});

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('http://posts.com/posts');
			const data = await res.json();
			console.log(JSON.stringify(data));
			setPosts(data);
		};
		fetchPosts('');
	}, []);

	const renderedPosts = Object.values(posts).map((post) => {
		return (
			<div
				className="card"
				style={{ width: '30%', marginBottom: '20px' }}
				key={post.id}
			>
				<div className="card-body">
					<h4>{post.title}</h4>
					<CommentList comments={post.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedPosts}
		</div>
	);
};

export default PostList;
