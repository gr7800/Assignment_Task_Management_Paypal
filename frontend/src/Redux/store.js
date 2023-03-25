import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from 'redux-thunk';
import { reducer as SprintReducer } from "./SprintReducer/reducer";
import { authReducer } from "./Auth/auth.reducer";

const rootReducer = combineReducers({ SprintReducer,authReducer });

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


export { store }