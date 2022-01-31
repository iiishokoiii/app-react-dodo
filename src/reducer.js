const initialState = {
  todoList: [{
    title: 'hoge'
  }],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TODO_LIST": {
      return {
        todoList: action.payload,
      };
    }
    default:
    return state;
  }
} 