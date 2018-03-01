import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { register } from '../actions'
import { connect } from 'react-redux';

export class SignUp extends Component {
	handleFormSubmit = ({email, password}) => {
		this.props.register(email, password, this.props.history);
	}

	renderAlert = () => {
		if (!this.props.error) return null;
		return <h3>{this.props.error}</h3>;
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<fieldset>
					<label>Email:</label>
					<Field name="email" component="input" type="text"/>
				</fieldset>
				<fieldset>
					<label>Password:</label>
					<Field name="password" component="input" type="text"/>
				</fieldset>
				<button action="submit">Sign Up!</button>
				{this.renderAlert()}
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		registered: state.users.registered
	};
};

SignUp = connect(mapStateToProps, { register })(SignUp);

export default reduxForm({
	form: 'signup',
	fields: ['username', 'password']
})(SignUp); 