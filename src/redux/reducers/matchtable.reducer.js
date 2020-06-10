const matchtableReducer = (state = [], action) => {
  switch (action.type) {
    //set matchtableReducer with select profiles returned from server
    case "SET_TABLE":
      return action.payload;
    case "UNSET_TABLE":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default matchtableReducer;
