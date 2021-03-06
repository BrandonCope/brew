import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import brewsReducer from './brews';
import usersReducer from './users';
import imagesReducer from './images';
import reviewsReducer from './reviews';
import usefulReducer from './useful';
import funnyReducer from './funny';
import coolReducer from './cool';


const rootReducer = combineReducers({
  session,
  breweries: brewsReducer,
  images: imagesReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  useful: usefulReducer,
  funny: funnyReducer,
  cool: coolReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
