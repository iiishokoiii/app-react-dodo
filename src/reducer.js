const initialState = {
  isFetchTodoList: false,
  isAdding: false,
  todoList: [{
    title: 'hoge'
  }],
  isDeleting: false,
  isFetchTodo: false,
  todo: null,
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
      
    case "ADD_TODO": {
      return {
        ...state,
        isAdding: true,
      };
    }
      
    case "SUCCESS_ADD_TODO": {
      return {
        ...state,
        isAdding: true,
      }
    }
      
    case "FETCH_TODO": {
      return {
        ...state,
        isFetchTodo: true,
      };
    }
      
    case "SUCCESS_FETCH_TODO": {
      return {
        ...state,
        isFetchTodo: false,
        todo: action.payload
      }
    }

    case "DELETE_TODO": {
      return {
        ...state,
        isDeleting: true,
      };
    }
      
    case "SUCCESS_DELETE_TODO": {
      return {
        ...state,
        isDeleting: false,
        todo: null
      }
    }
      
    default:
    return state;
  }
} 