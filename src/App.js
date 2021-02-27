import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import { CssAlert } from './utility/widgets';
import Layout from '../src/containers/Layout/Layout';

const App = (props) => {
	return (
		<BrowserRouter>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={props.networkError}
				key="topcenter"
			>
				<CssAlert severity="error">Looks like you're offline</CssAlert>
			</Snackbar>
			<div className="App">
				<Layout></Layout>
			</div>
		</BrowserRouter>
	);
};

const mapStateToProps = (state) => {
	return {
		networkError: state.network.networkError
	};
};

export default connect(mapStateToProps)(App);
