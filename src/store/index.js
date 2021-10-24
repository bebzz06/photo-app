import thunk from 'redux-thunk';
import randomPhotos from "./randomPhotos/randomPhotosReducer";
import likedPhotos from "./likedPhotos/likedPhotosReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    randomPhotos,
    likedPhotos
});

const middleware = applyMiddleware(thunk);

export default createStore(reducers, composeWithDevTools(middleware));