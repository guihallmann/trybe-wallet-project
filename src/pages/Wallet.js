import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends Component {
  render() {
    return (
      <main>
        <Header />
        <ExpenseForm />
      </main>
    );
  }
}

export default connect()(Wallet);
