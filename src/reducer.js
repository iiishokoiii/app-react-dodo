const initialState = {
  isFetchTodoList: false,
  todoList: [{
    title: 'hoge'
  }],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TODO_LIST": {
      return {
        ...state,
        isFetchTodoList: true,
      };
    }
      
    case "SUCCESS_FETCH_TODO_LIST": {
      return {
        ...state,
        isFetchTodoList: false,
        todoList: action.payload,
      };
    } 
      
    case "TOGGLE_TODO": {
      console.log('hoge')
      const newTodoList = state.todoList.map((todo) => {
        // payloadでidを受け取る
        // 指定したidのときのみ、chekckedの値を反転させる
        if (todo.id === action.payload) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      });
      return {
        todoList: newTodoList,
      };
    } 
    default:
    return state;
  }
} 