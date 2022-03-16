const LOAD_BREW = 'breweries/LOAD'
// const ADD = '/breweries/add'
// const UPDATE = '/breweries/edit'
// const REMOVE = '/breweries/remove'

const loadBreweries = (breweries) => ({ type: LOAD_BREW, breweries })

// const addBrewery = new_brewery => ({ type: ADD, new_brewery })

// const updateBrewery = edit_brewery => ({ type: UPDATE, edit_brewery })

// const removeBrewery = remove_brewery => ({ type: REMOVE, remove_brewery })

export const getBreweries = () => async dispatch => {
    const response = await fetch('/api/breweries/');
    if(response.ok) {
        const breweries = await response.json();
        dispatch(loadBreweries(breweries));
        return breweries;
    }
    return response;
}

// export const createBrewery = (payload) => async dispatch => {
//     const response = await fetch('/api/breweries', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });
//     if(response.ok) {
//         const new_brewery = await response.json();
//         dispatch(addBrewery(new_brewery));
//         return new_brewery;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     }
//     return response;
// }

// export const editBrewery = (payload) => async dispatch => {
//     const response = await fetch(`/api/breweries/${payload.id}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });
//     if(response.ok) {
//         const edit_brewery = await response.json();
//         dispatch(updateBrewery(edit_brewery));
//         return edit_brewery;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     }
//     return response;
// }


// export const deleteBrewery = (id) => async dispatch => {
//     const response = await fetch(`/api/breweries/${id}`, {
//         method: 'DELETE'
//     });
//     if(response.ok) {
//         const message = await response.json();
//         dispatch(removeBrewery(id));
//         return message;
//     }
//     return response;
// }

const breweriesReducer = (state= {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD_BREW:
            newState = {...state};
            action.breweries.forEach(brewery => newState[brewery.id] = brewery);
            return newState;
        // case ADD:
        //     newState = {...state};
        //     newState[action.new_brewery.id] = action.new_brewery;
        //     return newState;
        // case UPDATE:
        //     newState = {...state}
        //     newState[action.edit_brewery.id] = action.edit_brewery;
        //     return newState;
        // case REMOVE:
        //     newState = {...state};
        //     delete newState[action.remove_brewery];
        //     return newState;
        default:
            return state;
    }
}

export default breweriesReducer;
