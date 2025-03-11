import { usePost } from '../context/PostContext';
import List from './List';

export default function Posts() {
	const { posts } = usePost();
	return (
		<section>
			<List posts={posts} />
		</section>
	);
}
