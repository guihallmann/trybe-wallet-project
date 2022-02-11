import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <header>
        <section className="header-logo">
          <h2>My wallet</h2>
        </section>
        <section className="header-info">
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{this.totalExpenses().toFixed(2)}</span>
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
