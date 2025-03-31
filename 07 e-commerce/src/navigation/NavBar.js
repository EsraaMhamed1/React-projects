import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './Navbar.css';
import { CiUser } from 'react-icons/ci';
function NavBar({ query, handleInputChange }) {
	return (
		<nav>
			<div className='nav-container'>
				<input
					type='text'
					placeholder='Enter your search shoes.'
					value={query}
					onChange={handleInputChange}
				/>
			</div>

			<div className='profile-container' style={{ display: 'flex' }}>
				<p>
					<FiHeart className='nav-icons' />
				</p>
				<p>
					<AiOutlineShoppingCart className='nav-icons' />
				</p>
				<p>
					<CiUser className='nav-icons' />
				</p>
			</div>
		</nav>
	);
}

export default NavBar;
