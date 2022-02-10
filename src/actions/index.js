// Coloque aqui suas actions
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const actionSubmitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export function fetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    try {
      const data = await (await fetch(url)).json();
      dispatch(getCurrencies(data));
    } catch (error) {
      return error;
    }
  };
}
