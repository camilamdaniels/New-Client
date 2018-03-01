import React, { Component } from 'react';
import { logout } from '../actions'
import { connect } from 'react-redux';

class SignOut extends Component {
	componentWillMount() {
		this.props.logout();
	}

	render() {
		return <div>You have signed out.</div>;
	}
}

export default connect(null, { logout })(SignOut);