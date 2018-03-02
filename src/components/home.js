import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Map} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {noop} from '../utils/componentHelpers';

class Home extends Component {
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		data: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		data: Map()
	};

	@bind()
	handleClick() {
		this.props.actions.locationBack();
	}

	render() {
		const {data} = this.props;
		return (
			<div>
				<h1>Data title: {data.get('title')}</h1>
				This is the home page
				<button type="button" onClick={this.handleClick}>Back To About</button>
			</div>
		);
	}
}

export default Home;
