
function createStore(reducer) {

    // This should have 4 parts
    // 1. state
    // 2. get the state
    // 3. listen for changes on the state
    // 4. way to update the state

    let state; // 1
    let listeners = [];

    const getState = () => state; //2


    // 3
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => { //returns a new function to allow to unsub
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    // to upodate the state
    // predictable manner as possible
    const dispatch = (action) => {
        // call todos?
        state = reducer(state, action)
        // inform listeners state has updated via loop and invoke
        listeners.forEach((listener) => listener());
    };

    // user can access the stat when they create store
    return {
        getState,
        subscribe
    }
}



// APP CODE

//pure function, predictable
// Reducer function
function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo]);
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id);
        case 'TOGGLE_TODO':
            // Maps over the object and finds the matching one then uses object assign to create the opposite complete value
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({},todo,{complete: !todo.complete}));
        default:
            return state
    }
}

// goals reducer
function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal]);
        case 'REMOVE_TODO':
            return state.filter((goal) => goal.id !== goal.id);
        default:
            return state;
    }
}


// root reducer
function app (state = {} , action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}






const store = createStore(app);

store.dispatch({
    type: 'ADD_TODO',
        todo: {
        id: 0,
            name: "learn redux",
            complete: false,
    }
});