const LOAD = '/cool/load'
const ADD = '/cool/add'
const REMOVE = 'cool/remove'

const loadCool = cool => ({ type: LOAD, cool })

const addCool = new_cool => ({ type: ADD, new_cool })

const removeCool = remove_cool => ({ type: REMOVE, remove_cool })

export const getCool = () => async dispatch => {
    const response = await fetch('/api/cool/');
    if(response.ok) {
        const cool = await response.json();
        dispatch(loadCool(cool));
        return cool
    }
    return response;
}

export const createCool = (payload) => async dispatch => {
    const response = await fetch('/api/cool/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if(response.ok) {
        const new_cool = await response.json();
        dispatch(addCool(new_cool));
        return new_cool;
    }
    return response;
}

export const deletecool = (id) => async dispatch => {
    const response = await fetch(`/api/cool/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {

        const message = await response.json();
        dispatch(removeCool(id));
        return message;
    }
    return response;
}

const coolReducer = (state= {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.cool.forEach(element => newState[element.id] = element);
            return newState;
        case ADD:
            newState = {...state};
            newState[action.new_cool.id] = action.new_cool;
            return newState;
        case REMOVE:
            newState = {...state};
            delete newState[action.remove_cool];
            return newState;
        default:
            return state;
    }
}

export default coolReducer;
