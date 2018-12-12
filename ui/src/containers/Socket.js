import { connect } from "react-redux";

import Socket from "../services/Socket";
import { updateComputing, newFaces, newFace, newName, newProjections } from "../actions"

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
  updateMember: (member, id) => dispatch(newFace(member, id)),
  updateName: (member, id) => dispatch(newName(member, id)),
  updateProjections: (user, members) => dispatch(newProjections(user, members))
});

export default connect(mapStateToProps, mapDispatchToProps)(Socket);