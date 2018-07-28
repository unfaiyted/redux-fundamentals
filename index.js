const todo = {
    type: 'ADD_TODO',
        todo: {
            id: 0,
            name: "learn redux",
            complete: false,
        }
    }
//
// const remove =   {
//         type: 'REMOVE_TODO',
//         id:0,`
//
//     };



//pure function, predictable
function todos(state = [], action) {
    if(action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state;
}


function createStore() {

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
        state = todos(state, action)
        // inform listeners state has updated via loop and invoke
        listeners.forEach((listener) => listener());
    };

    // user can access the stat when they create store
    return {
        getState,
        subscribe
    }
}



const store = createStore();

store.dispatch({
    type: 'ADD_TODO',
        todo: {
        id: 0,
            name: "learn redux",
            complete: false,
    }
});