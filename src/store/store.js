import {createStore, applyMiddleware, compose} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import api from '../middleware/api';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(api),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(rootReducer);
export default store;
