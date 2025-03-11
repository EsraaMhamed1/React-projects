import { usePost } from '../context/PostContext';
import FormAddPost from './FormAddPost';
import Posts from './Posts';

export default function Main() {
	const { posts, onAddPost } = usePost();
	return (
		<main>
			<FormAddPost onAddPost={onAddPost} />
			<Posts posts={posts} />
		</main>
	);
}
