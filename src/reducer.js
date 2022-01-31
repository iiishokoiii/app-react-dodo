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