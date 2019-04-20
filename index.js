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

function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

const store = createStore(todos)

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