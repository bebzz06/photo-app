import axios from "axios";
import { FETCH_COLLECTION_GALLERY_PENDING, FETCH_COLLECTION_GALLERY_SUCCESS, FETCH_COLLECTION_GALLERY_ERROR, FETCH_COLLECTION_INFO_ERROR, FETCH_COLLECTION_INFO_PENDING, FETCH_COLLECTION_INFO_SUCCESS, FETCH_COLLECTION_INFO_RESET, FETCH_COLLECTION_FEED_PENDING, FETCH_COLLECTION_FEED_SUCCESS, FETCH_COLLECTION_FEED_ERROR, FETCH_COLLECTION_FEED_MORE, FETCH_COLLECTION_FEED_SHOW_MODAL, FETCH_COLLECTION_FEED_NEXT_PAGE, FETCH_COLLECTION_FEED_RESET } from "store/action-types";

export const getCollections = () => async (dispatch) => {

    try {
        dispatch({
            type: FETCH_COLLECTION_GALLERY_PENDING,
        })
        const url = `${process.env.REACT_APP_ENDPOINT}/collections?&per_page=5&client_id=${process.env.REACT_APP_API_KEY}`
        const { data } = await axios(url);

        dispatch({
            type: FETCH_COLLECTION_GALLERY_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: FETCH_COLLECTION_GALLERY_ERROR
        })

    }

}

export const getInfo = (id) => async (dispatch) => {

    try {
        dispatch({
            type: FETCH_COLLECTION_INFO_PENDING
        })
        const url = `${process.env.REACT_APP_ENDPOINT}/collections/${id}?client_id=${process.env.REACT_APP_API_KEY}`
        const { data } = await axios(url);

        dispatch({
            type: FETCH_COLLECTION_INFO_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: FETCH_COLLECTION_INFO_ERROR
        })

    }

}

export const resetInfo = () => (dispatch) => {
    dispatch({
        type: FETCH_COLLECTION_INFO_RESET
    })
}

export const getCollectionFeed = (id) => async (dispatch, getState) => {

    const newPage = getState().collectionFeed.page

    dispatch({
        type: FETCH_COLLECTION_FEED_PENDING
    })

    try {
        const url = `${process.env.REACT_APP_ENDPOINT}/collections/${id}/photos?per_page=12&page=${newPage}&client_id=${process.env.REACT_APP_API_KEY}`
        const { data } = await axios(url)

        dispatch({
            type: FETCH_COLLECTION_FEED_MORE,
            payload: !!data.length
        })
        dispatch({
            type: FETCH_COLLECTION_FEED_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: FETCH_COLLECTION_FEED_ERROR,
        })
    }
};


export const handleModal = (columnIndex, photoIndex) => (dispatch) => {
    dispatch({
        type: FETCH_COLLECTION_FEED_SHOW_MODAL,
        payload: { columnIndex, photoIndex }
    })
}

export const getNextPage = () => (dispatch, getState) => {
    const currentPage = getState().collectionFeed.page
    dispatch({
        type: FETCH_COLLECTION_FEED_NEXT_PAGE,
        payload: currentPage + 1
    })
}

export const resetCollectionFeed = () => (dispatch) => {
    dispatch({
        type: FETCH_COLLECTION_FEED_RESET
    })
}
