import { useEffect, useState } from 'react';
import { PostProvider } from './context/PostContext';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Archive from './components/Archive';
import Footer from './components/Footer';


function App() {
	const [isFakeDark, setIsFakeDark] = useState(false);

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(
		function () {
			document.documentElement.classList.toggle('fake-dark-mode');
		},
		[isFakeDark]
	);

	return (
		// 2 ) provide value to chiled component

		<section>
			<button
				onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
				className='btn-fake-dark-mode'
			>
				{isFakeDark ? '☀️' : '🌙'}
			</button>
			<PostProvider>
				<Header />
				<Main />
				<Archive />
				<Footer />
			</PostProvider>
		</section>
	);
}
export default App;
