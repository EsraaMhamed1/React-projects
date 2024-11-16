import './App.css';
// import Challeng from './components/challenge/Challeng';
// import Excercise from './components/Excercise/Excercise';
import FList from './components/FList';
import Logo from './components/Logo';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

function App() {
	return (
		<div className='app'>
			<Logo />
			<FList />
			<PackingList />
			<Stats />
			{/* <Excercise /> */}
			{/* <Challeng /> */}
		</div>
	);
}

export default App;
