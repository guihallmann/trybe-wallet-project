import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends Component {
  render() {
    return (
      <main>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </main>
    );
  }
}

export default connect()(Wallet);
