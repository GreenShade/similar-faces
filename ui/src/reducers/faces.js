const faces = (state = {
  rects: [],
  members: {
    member1: {face: undefined, name: "Not recognized"},
    member2: {face: undefined, name: "Not recognized"},
    member3: {face: undefined, name: "Not recognized"}
  },
  projections: {
    user: [],
    members: [[]]
  }}, action) => {
  switch (action.type) {
    case "NEW_RECTS":
      return {
        ...state,
        rects: action.value,
      };
    case "NEW_MEMBERS":
      return {
        ...state,
        members: {
          ...action.value
        }
      };
    case "NEW_PROJECTIONS":
      return {
        ...state,
        projections: {
          user: action.user,
          members: action.members
        }
      };
    default:
      return state;
  }
};

export default faces;