import './sidebar.css';
import Catigory from './Catigory/Catigory';
import Colors from './colors/Colors';
import Price from './price/Price';

function Sidebar({ handleChange }) {
	return (
		<>
			<section className='sidebar'>
				<div className='logo-container'>
					<h1>🛒</h1>
				</div>

				<Catigory handleChange={handleChange} />
				<Price handleChange={handleChange} />
				<Colors handleChange={handleChange} />
			</section>
		</>
	);
}

export default Sidebar;
