// Library Code

function crateStore () {
    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to the changes on the state
    // 4. Update the state

    let state;
    let listeners = []

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((elem) => elem !== listener)
        }
    }


    const dispatch = (action) => {
        state = todos(state, action)
        listeners.forEach((listeners) => listener())
    }

    return {
        getState, 
        subscribe,
        dispatch,
    }

    
}

const store = createStore()

store.subscribe(() => {
    console.log('The new state is: ', store.getState());
    }
)

const unsubscribe = store.subscribe( () => {
    console.log('The store changed');
    }
)

unsubscribe()


// App code

// FIRST Reducer
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo: 
            Object.assign({}, todo, {complete: !todo,complete}))
        default:
            return state
    }
}

// SECOND Reducer
function goals (state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

// ROOT Reducer
function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

const store = createStore(app)

store.subscribe(() => {
    console.log('The new state is: ', store.getState());
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }

})