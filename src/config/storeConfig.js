// import {applyMiddleware, compose, createStore} from 'redux';
// import rootReducer from '../redux/reducers/';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// const configureStore = state => {
//   const middlewares = [logger];
//   // if (process.env.NODE_ENV === 'development') {
//   //   middlewares.push(logger);
//   // }

//   const store = createStore(
//     rootReducer, // root reducer
//     state,
//     compose(applyMiddleware(thunk, ...middlewares)),
//   );

//   return store;
// };

// export default configureStore;

import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../redux/reducers/';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = () => {
  const middlewares = [thunk];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  return store;
};

export default configureStore;
