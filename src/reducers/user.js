// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SUBMIT_LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return {
      user: action.payload,
    };
  default:
    return state;
  }
}

export default user;
