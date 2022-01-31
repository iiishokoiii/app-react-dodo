export const fetchTodoListAction = () => ({
  type: "FETCH_TODO_LIST",
});
export const successFetchTodoListAction = (payload) => ({
  type: "SUCCESS_FETCH_TODO_LIST",
  payload,
});
export const toggleTodoAction = (payload) => ({
  type: "TOGGLE_TODO",
  payload,
});
export const addTodoAction = () => ({
  type: "ADD_TODO",
});
export const successAddTodoAction = () => ({
  type: "SUCCESS_ADD_TODO",
}); 