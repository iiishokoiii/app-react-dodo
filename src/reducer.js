const initialState = {
  isFetchTodoList: false,
  isAdding: false,
  todoList: [],
  isFetchTodo: false,
  todo: null,
  isDeleting: false,
  isEditing: false,
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
      const newTodoList = state.todoList.map((todo) => {
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
        isAdding: false,
      };
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
        todo: action.payload,
      };
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
        todo: null,
        isDeleting: false,
      };
    }

    case "EDIT_TODO": {
      return {
        ...state,
        isEditing: true,
      };
    }

    case "SUCCESS_EDIT_TODO": {
      return {
        ...state,
        todo: null,
        isEditing: false,
      };
    }

    default:
      return state;
  }
}
