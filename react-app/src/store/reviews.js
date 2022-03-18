const LOAD = '/reviews/load'
const ADD = '/reviews/add'
const UPDATE = '/reviews/edit'
const REMOVE = '/reviews/remove'

const loadReviews = reviews => ({ type: LOAD, reviews })

const addReview = new_review => ({ type: ADD, new_review })

const updateReview = edit_review => ({ type: UPDATE, edit_review })

const removeReview = remove_review => ({ type: REMOVE, remove_review })

export const getReviews = () => async dispatch => {
    const response = await fetch('/api/reviews/');
    if(response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
        return reviews;
    }
}

export const createReview = (payload) => async dispatch => {
    const response = await fetch('/api/reviews/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if(response.ok) {
        const new_review = await response.json();
        dispatch(addReview(new_review));
        return new_review;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    }
    return response;
}

export const editReview = (payload, reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if(response.ok) {
        const edit_review = await response.json();
        dispatch(updateReview(edit_review));
        return edit_review;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    }
    return response;
}


export const deleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        const message = await response.json();
        dispatch(removeReview(id));
        return message;
    }
    return response;
}

const reviewsReducer = (state= {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        case ADD:
            newState = {...state};
            newState[action.new_review.id] = action.new_review;
            return newState;
        case UPDATE:
            newState = {...state}
            newState[action.edit_review.id] = action.edit_review;
            return newState;
        case REMOVE:
            newState = {...state};
            delete newState[action.remove_review];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
