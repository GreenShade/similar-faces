import { connect } from "react-redux";

import Socket from "../services/Socket";
import { updateComputing, newFaces, newFace } from "../actions"

const mapStateToProps = state => ({
  video: state.video.video,
  id: state.video.id,
  width: state.video.width,
  height: state.video.height,
  computing: state.computing
});

const mapDispatchToProps = dispatch => ({
  updateComputing: (computing) => dispatch(updateComputing(computing)),
  updateRects: (rects) => dispatch(newFaces(rects)),
  updateMember: (member) => dispatch(newFace(member))
});

export default connect(mapStateToProps, mapDispatchToProps)(Socket);