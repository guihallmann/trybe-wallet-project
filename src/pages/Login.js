import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSubmitLogin } from '../actions';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmailRegex = this.handleEmailRegex.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { history, dispatchLoginInfo } = this.props;
    const { email } = this.state;
    dispatchLoginInfo(email);
    history.push('/carteira');
  }

  handleEmailRegex(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  }

  render() {
    const { email, password } = this.state;
    const PW_MIN_SIZE = 6;
    const MAIL_CHECK_STATUS = this.handleEmailRegex(email);
    return (
      <div className="login-page" data-testid="page-login">
        <form className="login-form">
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              className="login-input"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            className="login-btn"
            data-testid="login-submit-button"
            disabled={ !(password.length >= PW_MIN_SIZE && MAIL_CHECK_STATUS) }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

Login.propTypes = {
  dispatchLoginInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (info) => dispatch(actionSubmitLogin(info)),
});

export default connect(null, mapDispatchToProps)(Login);
