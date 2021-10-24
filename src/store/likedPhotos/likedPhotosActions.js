import { FETCH_FAVORITES_PHOTO_SUCCESS, FETCH_FAVORITES_PHOTO_ERROR } from "./likedPhotosReducer"

export const handleFavorites = (photo) => (dispatch, getState) => {
    try {
        const favorites = getState().likedPhotos.photos
        const newFavorites = { ...favorites }
        const key = photo.id
        !favorites[key] ? newFavorites[key] = photo : delete newFavorites[key];

        dispatch({
            type: FETCH_FAVORITES_PHOTO_SUCCESS,
            payload: newFavorites
        })
    } catch (err) {
        dispatch({
            type: FETCH_FAVORITES_PHOTO_ERROR
        })
    }

}

