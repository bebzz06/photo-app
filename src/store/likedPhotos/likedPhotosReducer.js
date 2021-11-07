import { FETCH_FAVORITES_PHOTO_SUCCESS, FETCH_FAVORITES_PHOTO_ERROR } from "store/action-types";

const initialState = {
    photos: {},
    hasError: false,
}



function likedPhotosReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_FAVORITES_PHOTO_SUCCESS:
            return {
                ...state,
                photos: { ...action.payload }
            }
        case FETCH_FAVORITES_PHOTO_ERROR:
            return {
                ...state,
                hasError: true
            }
        default:
            return state;
    }
}
export default likedPhotosReducer
