import thunk from 'redux-thunk';
import randomPhotos from "./randomPhotos/randomPhotosReducer"
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    randomPhotos
});

const middleware = applyMiddleware(thunk);

export default createStore(reducers, composeWithDevTools(middleware));