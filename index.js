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
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';


// Action creators
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}
function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}
function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}
function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}
function removeGoalAction(goal) {
    return {
        type: REMOVE_GOAL,
        goal,
    }
}

// FIRST Reducer
function todos (state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo: 
            Object.assign({}, todo, {complete: !todo,complete}))
        default:
            return state
    }
}

// SECOND Reducer
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
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

store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }))
  
  store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
  }))
  
  store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }))
  
  store.dispatch(removeTodoAction(1))
  
  store.dispatch(toggleTodoAction(0))
  
  store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
  }))
  
  store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
  }))
  
  store.dispatch(removeGoalAction(0))