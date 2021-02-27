import React from 'react';

import NotFoundImage from '../../assets/404.png';

import * as classes from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={classes.NotFound}>
			<img
				className={classes.NotFoundImage}
				src={NotFoundImage}
				alt="page-not-found"
			/>
		</div>
	);
};

export default NotFound;
