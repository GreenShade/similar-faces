import { connect } from "react-redux";

import Member from "../components/Member";

const mapStateToProps = state => ({
  members: state.faces.members
});

export default connect(
  mapStateToProps,
  null
)(Member);