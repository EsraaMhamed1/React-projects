function Input({ value, title, name, color, handleChange }) {
	return (
		<div>
			<label className='sidebar-label-container'>
				<input type='radio' name={name} value={value} onChange={handleChange} />
				<span className='checkmark' style={{ backgroundColor: color }}></span>
				{title}
			</label>
		</div>
	);
}

export default Input;
