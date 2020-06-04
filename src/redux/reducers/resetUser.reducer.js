const resetReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_RESET":
      return true;
    case "CLEAR_RESET":
      return false;
    default:
      return state;
  }
};

export { resetReducer };
