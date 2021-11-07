import axios from "axios";
import { RANDOM_PHOTOS_FETCH_PHOTOS_SUCCESS, RANDOM_PHOTOS_FETCH_PHOTOS_PENDING, RANDOM_PHOTOS_FETCH_PHOTOS_ERROR, RANDOM_PHOTOS_SHOW_MODAL, RANDOM_PHOTOS_SHOW_MASONRY_MODAL, RANDOM_PHOTOS_RESET_STATE } from "store/action-types";
import { handleFavorites } from "../likedPhotos/likedPhotosActions";

export const getPhotos = () => async (dispatch) => {

    try {
        dispatch({
            type: RANDOM_PHOTOS_FETCH_PHOTOS_PENDING
        })
        const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&orientation=landscape&client_id=${process.env.REACT_APP_API_KEY}`
        const { data } = await axios(url);

        dispatch({
            type: RANDOM_PHOTOS_FETCH_PHOTOS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: RANDOM_PHOTOS_FETCH_PHOTOS_ERROR
        })

    }

}

export const handleModal = (i) => (dispatch) => {
    dispatch({
        type: RANDOM_PHOTOS_SHOW_MODAL,
        payload: i
    })
}

export const handleMasonryModal = (columnIndex, photoIndex) => (dispatch) => {
    dispatch({
        type: RANDOM_PHOTOS_SHOW_MASONRY_MODAL,
        payload: { columnIndex, photoIndex }
    })
}

export const resetState = () => (dispatch) => {
    dispatch({
        type: RANDOM_PHOTOS_RESET_STATE
    })
}

export const handleLike = (photo) => (dispatch) => {
    dispatch(
        handleFavorites(photo)
    )
}