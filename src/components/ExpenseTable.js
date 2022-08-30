import React, * as react from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import '../styles/table.css';

class ExpenseTable extends react.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table className="expense-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ Number(exp.value).toFixed(2) }</td>
              <td>{ exp.exchangeRates[exp.currency].name.split('/')[0]}</td>
              <td>{ (Number(exp.exchangeRates[exp.currency].ask)).toFixed(2)}</td>
              <td>
                {
                  (Number(exp.value) * Number(exp.exchangeRates[exp.currency].ask))
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  className="table-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  className="table-btn"
                  onClick={ () => deleteExpense(exp) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (info) => dispatch(removeExpense(info)),
});

ExpenseTable.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
