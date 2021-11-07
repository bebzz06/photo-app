import { RANDOM_PHOTOS_FETCH_PHOTOS_PENDING, RANDOM_PHOTOS_FETCH_PHOTOS_SUCCESS, RANDOM_PHOTOS_FETCH_PHOTOS_ERROR, RANDOM_PHOTOS_SHOW_MODAL, RANDOM_PHOTOS_SHOW_MASONRY_MODAL, RANDOM_PHOTOS_RESET_STATE } from "store/action-types";


const initialState = {
    photos: [],
    isLoading: false,
    hasError: false,
    showModal: -1,
    showMasonryModal: { currentCol: -1, currentPhoto: -1 }
}



function randomPhotosReducer(state = initialState, action) {

    switch (action.type) {
        case RANDOM_PHOTOS_FETCH_PHOTOS_PENDING:
            return {
                ...state,
                hasError: false,
                isLoading: true,
            }
        case RANDOM_PHOTOS_FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: [...state.photos, ...action.payload],
                isLoading: false,
            };
        case RANDOM_PHOTOS_FETCH_PHOTOS_ERROR:
            return {
                ...state,
                hasError: true,
                isLoading: false
            };
        case RANDOM_PHOTOS_SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload
            }
        case RANDOM_PHOTOS_SHOW_MASONRY_MODAL:
            return {
                ...state,
                showMasonryModal: { currentCol: action.payload.columnIndex, currentPhoto: action.payload.photoIndex }
            }
        case RANDOM_PHOTOS_RESET_STATE:
            return {
                ...state,
                photos: []
            }
        default:
            return state;
    };
}
export default randomPhotosReducer;