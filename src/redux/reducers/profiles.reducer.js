const profilesReducer = (state = [], action) => {
  switch (action.type) {
    //set profilesReducer with profiles returned from server
    case "SET_PROFILES":
      return action.payload;
    case "UNSET_PROFILES":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default profilesReducer;
