const checkedReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_CHECKED":
      return action.payload;
    case "UNSET_CHECKED":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default checkedReducer;
