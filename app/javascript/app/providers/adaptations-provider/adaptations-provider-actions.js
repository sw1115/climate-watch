import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const fetchAdaptationsInit = createAction('fetchAdaptationsInit');
const fetchAdaptationsReady = createAction('fetchAdaptationsReady');
const fetchAdaptationsFail = createAction('fetchAdaptationsFail');

const fetchAdaptations = createThunkAction(
  'fetchAdaptations',
  () => (dispatch, state) => {
    const { adaptations } = state();
    if (isEmpty(adaptations.data) && !adaptations.loading) {
      dispatch(fetchAdaptationsInit());
      fetch('/api/v1/adaptations')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchAdaptationsReady(data));
          } else {
            dispatch(fetchAdaptationsReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchAdaptationsFail());
        });
    }
  }
);

export default {
  fetchAdaptations,
  fetchAdaptationsInit,
  fetchAdaptationsReady,
  fetchAdaptationsFail
};
