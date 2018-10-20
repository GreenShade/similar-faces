import { connect } from "react-redux";

import Video from "../components/Video";
import { updateVideoDimensions, updateVideoFrame } from "../actions"

const mapStateToProps = state => ({
  id: state.video.id
});

const mapDispatchToProps = dispatch => ({
  updateVideoDimensions: dims => dispatch(updateVideoDimensions(dims)),
  updateVideoFrame: video => dispatch(updateVideoFrame(video)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);