import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchCountryNDCFullInit = createAction('fetchCountryNDCFullInit');
const fetchCountryNDCFullReady = createAction('fetchCountryNDCFullReady');
const fetchCountryNDCFullFailed = createAction('fetchCountryNDCFullFailed');

const fetchCountryNDCFull = createThunkAction(
  'fetchCountryNDCFull',
  (iso, search) => dispatch => {
    const url = search
      ? `/api/v1/ndcs/${iso}/text?${Object.keys(search)[0]}=${search[
        Object.keys(search)[0]
      ]}`
      : `/api/v1/ndcs/${iso}/text`;
    dispatch(fetchCountryNDCFullInit());
    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(data => {
        dispatch(fetchCountryNDCFullReady(data));
      })
      .catch(error => {
        dispatch(fetchCountryNDCFullFailed(iso));
        console.info(error);
      });
  }
);

export default {
  fetchCountryNDCFull,
  fetchCountryNDCFullInit,
  fetchCountryNDCFullReady,
  fetchCountryNDCFullFailed
};
