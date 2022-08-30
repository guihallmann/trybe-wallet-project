import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends Component {
  // Função feita com auxílio do Fadiga, Ruy e Petzinger
  totalExpenses = () => {
    const { expenses } = this.props;
    let soma = 0;
    expenses.forEach((expense) => {
      soma += Number(expense.exchangeRates[expense.currency].ask) * Number(expense.value);
    });
    return soma;
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <section className="header-logo">
          <h1>Trybe Wallet</h1>
        </section>
        <section className="header-info">
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{`R$ ${this.totalExpenses().toFixed(2)}`}</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
