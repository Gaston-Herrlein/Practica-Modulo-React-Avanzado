import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { withExtraArgument } from "redux-thunk";

import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import * as auth from "../pages/auth/service";
import * as tweets from "../pages/tweets/service";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState, { router }) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(withExtraArgument({ services: { auth, tweets }, router }))
    )
  );

  return store;
}
