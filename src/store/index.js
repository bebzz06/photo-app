import thunk from 'redux-thunk';
import randomPhotos from "./randomPhotos/randomPhotosReducer";
import likedPhotos from "./likedPhotos/likedPhotosReducer";
import collectionFeed from "./collectionFeed/collectionFeedReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    randomPhotos,
    likedPhotos,
    collectionFeed
});

const middleware = applyMiddleware(thunk);

export default createStore(reducers, composeWithDevTools(middleware));