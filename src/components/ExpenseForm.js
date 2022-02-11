import React, * as react from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';

class ExpenseForm extends react.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { currenciesList, expense } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    expense({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...currenciesList },
    });
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  render() {
    const pagamentos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currenciesList } = this.props;
    const keys = Object.keys(currenciesList).filter((curr) => curr !== 'USDT');
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <form className="expenseForm">
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select value={ currency } name="currency" onChange={ this.handleChange }>
              {keys.map((curr) => (
                <option data-testid={ curr } value={ curr } key={ curr }>
                  { curr }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              value={ method }
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
            >
              {pagamentos.map((pay) => (
                <option value={ pay } key={ pay }>
                  { pay }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="tag">
            TAG:
            <select
              value={ tag }
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              {tags.map((curr) => (
                <option value={ curr } key={ curr }>
                  { curr}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
  expense: (info) => dispatch(addExpense(info)),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  expense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
