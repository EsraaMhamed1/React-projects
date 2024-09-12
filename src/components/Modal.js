const Modal = ({ isVisible, errorMessage }) => {
	if (isVisible) {
		return (
			<div className='modal'>
				<div className='modal-content'>
					<h2 style={{ color: errorMessage ? 'red' : 'green' }}>
						{errorMessage != null
							? errorMessage
							: 'The Form Has Been Submitted Successfully '}
					</h2>
				</div>
			</div>
		);
	} else return null;
};
export default Modal;
