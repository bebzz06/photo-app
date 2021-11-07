import { FETCH_COLLECTION_GALLERY_PENDING, FETCH_COLLECTION_GALLERY_SUCCESS, FETCH_COLLECTION_GALLERY_ERROR, FETCH_COLLECTION_INFO_PENDING, FETCH_COLLECTION_INFO_SUCCESS, FETCH_COLLECTION_INFO_ERROR, FETCH_COLLECTION_INFO_RESET, FETCH_COLLECTION_FEED_MORE, FETCH_COLLECTION_FEED_PENDING, FETCH_COLLECTION_FEED_SUCCESS, FETCH_COLLECTION_FEED_ERROR, FETCH_COLLECTION_FEED_SHOW_MODAL, FETCH_COLLECTION_FEED_NEXT_PAGE, FETCH_COLLECTION_FEED_RESET } from "store/action-types";

const initialState = {
    collections: [],
    collectionInfo: null,
    collectionFeed: [],
    isLoading: false,
    hasError: false,
    showModal: { currentCol: -1, currentPhoto: -1 },
    hasMore: true,
    page: 1
}

function collectionFeedReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_COLLECTION_GALLERY_PENDING:
            return {
                ...state,
                hasError: false,
                isLoading: true,
            }
        case FETCH_COLLECTION_GALLERY_SUCCESS:

            return {
                ...state,
                collections: action.payload,
                isLoading: false,
            };
        case FETCH_COLLECTION_GALLERY_ERROR:
            return {
                ...state,
                hasError: true,
                isLoading: false
            };

        case FETCH_COLLECTION_INFO_PENDING:

            return {
                ...state,
                hasError: false,
                isLoading: true
            }
        case FETCH_COLLECTION_INFO_SUCCESS:

            return {
                ...state,
                collectionInfo: action.payload,
                isLoading: false
            }
        case FETCH_COLLECTION_INFO_ERROR:
            return {
                ...state,
                hasError: true,
                isLoading: false
            }
        case FETCH_COLLECTION_INFO_RESET:
            return {
                ...state,
                collectionInfo: null
            }
        case FETCH_COLLECTION_FEED_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COLLECTION_FEED_MORE:
            return {
                ...state,
                hasMore: action.payload

            }
        case FETCH_COLLECTION_FEED_SUCCESS:
            return {
                ...state,
                collectionFeed: [...state.collectionFeed, ...action.payload],
                isLoading: false

            }
        case FETCH_COLLECTION_FEED_ERROR:
            return {
                ...state,
                hasError: true,
                isLoading: false
            }
        case FETCH_COLLECTION_FEED_SHOW_MODAL:
            return {
                ...state,
                showModal: { currentCol: action.payload.columnIndex, currentPhoto: action.payload.photoIndex }
            }
        case FETCH_COLLECTION_FEED_NEXT_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case FETCH_COLLECTION_FEED_RESET:
            return {
                ...state,
                collectionFeed: [],
                hasMore: true,
                page: 1
            }
        default:
            return state;
    };
}
export default collectionFeedReducer;

