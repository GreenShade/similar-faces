const video = (state = {id: 0, width: 0, height: 0, video: ""}, action) => {
  switch (action.type) {
    case "VIDEO_DIMENSIONS":
      return {
        width: action.width,
        height: action.height,
        id: state.id,
        video: state.video
      };
    case "VIDEO_FRAME":
      return {
        video: action.video,
        width: state.width,
        height: state.height,
        id: action.id
      };
    default:
      return state;
  }
};

export default video;