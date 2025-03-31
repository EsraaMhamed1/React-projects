import Input from '../../components/Input';
import './catigory.css';

function Catigory({ handleChange }) {
	return (
		<div>
			<h2 className='sidebar-title'>Category</h2>
			<div>
				<label className='sidebar-label-container'>
					<input onChange={handleChange} type='radio' value='' name='test' />
					<span className='checkmark'></span>all
				</label>
				<Input
					handleChange={handleChange}
					value='sneakers'
					title={'Sneakers'}
					name={'test'}
				/>
				<Input
					handleChange={handleChange}
					value='flats'
					title={'Flats'}
					name={'test'}
				/>
				<Input
					handleChange={handleChange}
					value='Sandals'
					title={'Sandals'}
					name={'test'}
				/>
				<Input
					handleChange={handleChange}
					value='heels'
					title={'Heels'}
					name={'test'}
				/>
			</div>
		</div>
	);
}

export default Catigory;
