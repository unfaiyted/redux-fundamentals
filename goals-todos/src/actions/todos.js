import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';


function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodo (id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

export function toggleTodo (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}


export function handleAddTodo(name, cb) {
    return (dispatch) => {
        return API.saveTodo(name)
            .then((todo) => {
                dispatch(addTodo(todo));
                cb();
            })
            .catch(() => alert("Error adding todo"))
    }
}

export function handleDeleteTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodo(todo.id));
        return API.deleteTodo(todo.id)
            .catch(() => {
                // Readds on fail
                dispatch(addTodo(todo));
                alert("Error deleting");
            })}
}



export function handleToggle(todo) {
    return (dispatch) => {
        return API.saveTodoToggle(todo)
            .then((res) => {
                dispatch(toggleTodo(todo))
            }).catch(() => alert("Error flippy floppying"))
    }
}

