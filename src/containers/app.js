import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {actions as dataActions, selectors as dataSelectors} from '../ducks/data';

import routes from '../routes';

import {unique, click} from '../utils/componentHelpers';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	data: dataSelectors.getData(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...dataActions
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		data: ImmutablePropTypes.map
	};

	static defaultProps = {
		data: Map()
	};

	@bind()
	handleLinkClick(page) {
		this.props.actions.locationPush({
			pathname: page
		});
	}

	componentDidMount() {
		this.props.actions.dataSet({
			payload: {
				title: 'This is a test title',
				description: 'This is the test description',
				images: [
					'http://via.placeholder.com/950x600/878cdf/99fbc6?text=Dummy%20Image',
					'http://via.placeholder.com/950x600/99fbc6/878cdf?text=Dummy%20Image',
					'http://via.placeholder.com/950x600/red/000?text=Dummy%20Image'
				]
			}
		});
	}

	render() {
		return (
			<div id="app" className="app">
				<h1>App Container</h1>
				<Link to="/">Home</Link>
				<a onClick={click(this.handleLinkClick, 'about')}>About</a>
				<div id="wrap">
					{renderRoutes(routes, {...this.props})}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
