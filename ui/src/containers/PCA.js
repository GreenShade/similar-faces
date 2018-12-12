import { connect } from "react-redux";

import PCA from "../components/PCA";

const mapStateToProps = state => ({
  user: state.faces.projections.user,
  members: state.faces.projections.members
});

export default connect(
  mapStateToProps,
  null
)(PCA);