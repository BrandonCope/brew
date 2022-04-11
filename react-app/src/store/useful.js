// const LOAD = '/useful/load'
// const ADD = '/useful/add'
// const REMOVE = 'useful/remove'

// const loadUseful = useful => ({ type: LOAD, useful })

// const addUseful = new_useful => ({ type: ADD, new_useful })

// const removeUseful = remove_useful => ({ type: REMOVE, remove_useful })

// export const getUseful = () => async dispatch => {
//     const response = await fetch('/api/useful/');
//     if(response.ok) {
//         const useful = await response.json();
//         dispatch(loadUseful(useful));
//         return useful
//     }
//     return response;
// }

// export const createUseful = (payload) => async dispatch => {
//     const response = await fetch('/api/useful/', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//     });
//     if(response.ok) {
//         const new_useful = await response.json();
//         dispatch(addUseful(new_useful));
//         return new_useful;
//     }
//     return response;
// }

// export const deleteUseful = (id) => async dispatch => {
//     const response = await fetch(`/api/useful/${id}`, {
//         method: 'DELETE'
//     });
//     if(response.ok) {

//         const message = await response.json();
//         dispatch(removeUseful(id));
//         return message;
//     }
//     return response;
// }

// const usefulReducer = (state= {}, action) => {
//     let newState;
//     switch(action.type) {
//         case LOAD:
//             newState = {...state};
//             action.useful.forEach(element => newState[element.id] = element);
//             return newState;
//         case ADD:
//             newState = {...state};
//             newState[action.new_useful.id] = action.new_useful;
//             return newState;
//         case REMOVE:
//             newState = {...state};
//             delete newState[action.remove_useful];
//             return newState;
//         default:
//             return state;
//     }
// }

// export default usefulReducer;
