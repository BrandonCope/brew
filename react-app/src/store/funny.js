const LOAD = '/funny/load'
const ADD = '/funny/add'
const REMOVE = 'funny/remove'

const loadFunny = funny => ({ type: LOAD, funny })

const addFunny = new_funny => ({ type: ADD, new_funny })

const removeFunny = remove_funny => ({ type: REMOVE, remove_funny })

export const getFunny = () => async dispatch => {
    const response = await fetch('/api/funny/');
    if(response.ok) {
        const funny = await response.json();
        dispatch(loadFunny(funny));
        return funny
    }
    return response;
}

export const createFunny = (payload) => async dispatch => {
    const response = await fetch('/api/funny/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if(response.ok) {
        const new_funny = await response.json();
        dispatch(addFunny(new_funny));
        return new_funny;
    }
    return response;
}

export const deleteFunny = (id) => async dispatch => {
    const response = await fetch(`/api/funny/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {

        const message = await response.json();
        dispatch(removeFunny(id));
        return message;
    }
    return response;
}

const funnyReducer = (state= {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.funny.forEach(element => newState[element.id] = element);
            return newState;
        case ADD:
            newState = {...state};
            newState[action.new_funny.id] = action.new_funny;
            return newState;
        case REMOVE:
            newState = {...state};
            delete newState[action.remove_funny];
            return newState;
        default:
            return state;
    }
}

export default funnyReducer;
