const LOAD = '/images/load'
const ADD = '/images/add'
const REMOVE = '/images/remove'

const loadImages = (images) => ({type: LOAD, images});

const addImage = new_image => ({ type: ADD, new_image })

const removeImage = remove_image => ({ type: REMOVE, remove_image })

export const getImages = () => async dispatch => {
    const response = await fetch('/api/images/');
    if(response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
        return images;
    }
}

export const createImage = (payload) => async dispatch => {
    const response = await fetch('/api/images/', {
        method: 'POST',
        body: payload,
    });
    if(response.ok) {
        const new_image = await response.json();
        dispatch(addImage(new_image));
        return new_image;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}


export const deleteImage = (id, formData) => async dispatch => {
    const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        body: formData
    });
    if(response.ok) {
        const message = await response.json();
        dispatch(removeImage(id));
        return message;
    }
    return response;
}

const imagesReducer = (state= {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.images.forEach(image => newState[image.id] = image);
            return newState;
        case ADD:
            newState = {...state};
            newState[action.new_image.id] = action.new_image;
            return newState;
        case REMOVE:
            newState = {...state};
            delete newState[action.remove_image];
            return newState;
        default:
            return state;
            }
        }

        export default imagesReducer;
